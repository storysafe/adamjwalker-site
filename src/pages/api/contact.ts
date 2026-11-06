import type { APIRoute } from "astro";

export const prerender = false;

/**
 * Receives the Work with me and Speaking forms.
 *
 * TODO before launch: deliver submissions somewhere real. Options:
 *  - Cloudflare Email Routing `send_email` binding (free, same account)
 *  - Resend / Postmark API with a secret set via `wrangler secret put`
 * Until then submissions are only logged, so do not point real traffic here.
 */
export const POST: APIRoute = async ({ request, redirect }) => {
	const form = await request.formData();
	const source = String(form.get("form") ?? "contact");
	const fields: Record<string, string> = {};
	for (const [key, value] of form.entries()) {
		if (typeof value === "string") fields[key] = value.slice(0, 5000);
	}

	// Basic honeypot: bots fill hidden fields.
	if (fields.website) return redirect("/", 303);

	console.log(`[contact:${source}]`, JSON.stringify(fields));

	const back = source === "speaking" ? "/speaking?sent=1#book" : "/work-with-me?sent=1#contact";
	return redirect(back, 303);
};
