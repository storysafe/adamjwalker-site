/**
 * EmDash email transport that sends through Cloudflare Email Service
 * (the EMAIL send_email binding in wrangler.jsonc). This is what lets the
 * admin's "Sign in with email link" and other system emails go out.
 */
import { definePlugin } from "emdash";
import { env } from "cloudflare:workers";
import { CONTACT_FROM } from "../site.config";

type Mailer = { send(msg: Record<string, unknown>): Promise<{ messageId: string }> };

export function createPlugin() {
	return definePlugin({
		id: "cloudflare-email",
		version: "0.1.0",
		capabilities: ["hooks.email-transport:register"],
		hooks: {
			"email:deliver": {
				exclusive: true,
				handler: async ({ message }) => {
					const mailer = (env as unknown as { EMAIL?: Mailer }).EMAIL;
					if (!mailer) throw new Error("EMAIL binding is not configured");
					await mailer.send({
						to: message.to,
						...(message.cc?.length ? { cc: message.cc } : {}),
						from: { email: CONTACT_FROM, name: "adamjwalker.com" },
						...(message.replyTo ? { replyTo: message.replyTo } : {}),
						subject: message.subject,
						text: message.text,
						...(message.html ? { html: message.html } : {}),
					});
				},
			},
		},
	});
}
