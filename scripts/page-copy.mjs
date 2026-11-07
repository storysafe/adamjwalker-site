#!/usr/bin/env node
/**
 * Editable page copy setup.
 *
 *   node scripts/page-copy.mjs seed
 *     Adds the page collections and their entries to seed/seed.json
 *     (used when a fresh site is set up).
 *
 *   node scripts/page-copy.mjs provision --url https://adamjwalker.com
 *     Creates any missing page collections, fields, and entries on a running
 *     site. Never overwrites an entry that already exists. Uses the token from
 *     `npx emdash login --url <url>` (or EMDASH_TOKEN).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { PAGES, defaultData, fieldDefinitions } from "../src/page-copy/definitions.mjs";

const SUPPORTS = ["drafts", "revisions"];
const [cmd, ...args] = process.argv.slice(2);
const arg = (name) => {
	const i = args.indexOf(`--${name}`);
	return i >= 0 ? args[i + 1] : undefined;
};

function collectionSeed(page) {
	return { slug: page.slug, label: page.label, labelSingular: page.label, supports: SUPPORTS, fields: fieldDefinitions(page) };
}

if (cmd === "seed") {
	const path = new URL("../seed/seed.json", import.meta.url);
	const seed = JSON.parse(readFileSync(path, "utf8"));
	const slugs = new Set(PAGES.map((p) => p.slug));
	seed.collections = [...seed.collections.filter((c) => !slugs.has(c.slug)), ...PAGES.map(collectionSeed)];
	seed.content ??= {};
	for (const page of PAGES) {
		seed.content[page.slug] = [{ id: `${page.slug}-main`, slug: "main", status: "published", data: defaultData(page) }];
	}
	writeFileSync(path, JSON.stringify(seed, null, "\t") + "\n");
	console.log(`Added ${PAGES.length} page collections to seed/seed.json`);
} else if (cmd === "provision") {
	const base = (arg("url") ?? "").replace(/\/$/, "");
	if (!base) throw new Error("Pass --url https://your-site");
	let token = process.env.EMDASH_TOKEN;
	let cookie;
	if (!token && /^http:\/\/(localhost|127\.0\.0\.1)/.test(base)) {
		const res = await fetch(base + "/_emdash/api/auth/dev-bypass", { redirect: "manual" });
		cookie = (res.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).join("; ");
	}
	if (!token && !cookie) {
		const auth = JSON.parse(readFileSync(join(homedir(), ".config/emdash/auth.json"), "utf8"));
		const entry = Object.entries(auth).find(([k]) => k.replace(/\/$/, "") === base)?.[1] ?? Object.values(auth)[0];
		token = entry?.accessToken ?? entry?.access_token ?? entry?.token;
	}
	if (!token && !cookie) throw new Error("No token. Run: npx emdash login --url " + base);

	const api = async (method, path, body) => {
		const res = await fetch(base + "/_emdash/api" + path, {
			method,
			headers: { ...(token ? { Authorization: `Bearer ${token}` } : { Cookie: cookie }), "Content-Type": "application/json", "X-EmDash-Request": "1" },
			body: body ? JSON.stringify(body) : undefined,
		});
		const text = await res.text();
		let json;
		try {
			json = JSON.parse(text);
		} catch {
			json = text;
		}
		return { ok: res.ok, status: res.status, json };
	};

	for (const page of PAGES) {
		const existing = await api("GET", `/schema/collections/${page.slug}`);
		if (!existing.ok) {
			const { fields, ...collection } = collectionSeed(page);
			const made = await api("POST", "/schema/collections", collection);
			if (!made.ok) throw new Error(`Create ${page.slug}: ${made.status} ${JSON.stringify(made.json)}`);
			console.log(`+ collection ${page.slug}`);
		}
		const have = await api("GET", `/schema/collections/${page.slug}/fields`);
		const list = have.json?.data?.items ?? have.json?.data?.fields ?? have.json?.items ?? have.json?.fields ?? [];
		const haveSlugs = new Set(list.map((f) => f.slug));
		for (const field of fieldDefinitions(page)) {
			if (haveSlugs.has(field.slug)) continue;
			const made = await api("POST", `/schema/collections/${page.slug}/fields`, { ...field, validation: field.validation ?? null });
			if (!made.ok) throw new Error(`Field ${page.slug}.${field.slug}: ${made.status} ${JSON.stringify(made.json)}`);
			console.log(`  + field ${field.slug}`);
		}
		const entry = await api("GET", `/content/${page.slug}/main`);
		if (entry.ok) {
			console.log(`  = entry exists, left as is`);
			continue;
		}
		const created = await api("POST", `/content/${page.slug}`, { slug: "main", data: defaultData(page) });
		if (!created.ok) throw new Error(`Entry ${page.slug}: ${created.status} ${JSON.stringify(created.json)}`);
		const id = created.json?.data?.item?.id ?? created.json?.data?.id ?? created.json?.item?.id;
		const pub = await api("POST", `/content/${page.slug}/${id}/publish`);
		console.log(`  + entry main ${pub.ok ? "(published)" : `(publish failed: ${pub.status} ${JSON.stringify(pub.json)})`}`);
	}
} else {
	console.log("Usage: node scripts/page-copy.mjs seed | provision --url <site>");
}
