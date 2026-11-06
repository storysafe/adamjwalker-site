import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { EmailMessage } from "cloudflare:email";
import { CONTACT_TO, CONTACT_FROM } from "../../site.config";

export const prerender = false;

/**
 * Receives the Work with me and Speaking forms and emails them to CONTACT_TO
 * through Cloudflare Email Routing (the SEND_EMAIL binding in wrangler.jsonc).
 */
export const POST: APIRoute = async ({ request, redirect }) => {
	const form = await request.formData();
	const source = String(form.get("form") ?? "contact");
	const back = source === "speaking" ? "/speaking" : "/work-with-me";
	const anchor = source === "speaking" ? "#book" : "#contact";

	const fields: Record<string, string> = {};
	for (const [key, value] of form.entries()) {
		if (typeof value === "string") fields[key] = value.slice(0, 5000).trim();
	}
	// Honeypot: bots fill the hidden "website" field.
	if (fields.website) return redirect(`${back}?sent=1${anchor}`, 303);

	const email = fields.email ?? "";
	if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email) || !fields.name) {
		return redirect(`${back}?error=1${anchor}`, 303);
	}

	const subject =
		source === "speaking"
			? `Speaking request: ${fields.event || "event"} (${fields.name})`
			: `New inquiry: ${fields.hat || "Work with me"} (${fields.name})`;

	const skip = new Set(["form", "website"]);
	const lines = Object.entries(fields)
		.filter(([k, v]) => !skip.has(k) && v)
		.map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`);
	const body = `${lines.join("\n")}\n\n— sent from adamjwalker.com${back}`;

	const clean = (s: string) => s.replace(/[\r\n]+/g, " ");
	const raw = [
		`From: adamjwalker.com <${CONTACT_FROM}>`,
		`To: ${CONTACT_TO}`,
		`Reply-To: ${clean(fields.name)} <${email}>`,
		`Subject: ${clean(subject)}`,
		`Message-ID: <${crypto.randomUUID()}@adamjwalker.com>`,
		`Date: ${new Date().toUTCString()}`,
		"MIME-Version: 1.0",
		"Content-Type: text/plain; charset=utf-8",
		"Content-Transfer-Encoding: 8bit",
		"",
		body,
	].join("\r\n");

	try {
		const binding = (env as unknown as { SEND_EMAIL?: { send(m: EmailMessage): Promise<void> } }).SEND_EMAIL;
		if (!binding) throw new Error("SEND_EMAIL binding missing");
		await binding.send(new EmailMessage(CONTACT_FROM, CONTACT_TO, raw));
	} catch (err) {
		console.error("[contact] send failed", err, raw);
		return redirect(`${back}?error=1${anchor}`, 303);
	}
	return redirect(`${back}?sent=1${anchor}`, 303);
};
