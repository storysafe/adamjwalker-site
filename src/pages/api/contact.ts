import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { CONTACT_TO, CONTACT_FROM } from "../../site.config";

export const prerender = false;

/**
 * Receives the Work with me and Speaking forms and emails them to CONTACT_TO
 * through Cloudflare Email Service (the EMAIL send_email binding in wrangler.jsonc).
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
	type Mailer = { send(msg: Record<string, unknown>): Promise<{ messageId: string }> };
	try {
		const mailer = (env as unknown as { EMAIL?: Mailer }).EMAIL;
		if (!mailer) throw new Error("EMAIL binding missing");
		await mailer.send({
			to: CONTACT_TO,
			from: { email: CONTACT_FROM, name: "adamjwalker.com" },
			replyTo: { email, name: clean(fields.name) },
			subject: clean(subject),
			text: body,
		});
	} catch (err) {
		console.error("[contact] send failed", err);
		return redirect(`${back}?error=1${anchor}`, 303);
	}
	return redirect(`${back}?sent=1${anchor}`, 303);
};
