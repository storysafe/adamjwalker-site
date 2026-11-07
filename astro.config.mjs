import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";
import { fileURLToPath } from "node:url";

/** Sends admin emails (sign-in links, invites) through Cloudflare Email Service. */
const cloudflareEmail = {
	id: "cloudflare-email",
	version: "0.1.0",
	format: "native",
	entrypoint: fileURLToPath(new URL("./src/plugins/cloudflare-email.ts", import.meta.url)),
};

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	redirects: {
		"/blog": "/writing",
		"/feed": "/rss.xml",
		"/about": "/now",
		"/about-the-author": "/now",
		"/consulting": "/work-with-me",
		"/contact": "/work-with-me",
		"/marketing-mentor": "/work-with-me",
		"/free-website-consult": "/work-with-me",
		"/website-messaging-analysis": "/work-with-me",
		"/newsletters": "/",
		// Old WordPress pages that have a new home
		"/pages/about": "/now",
		"/pages/about-the-author": "/now",
		"/pages/home": "/",
		"/pages/blog": "/writing",
		"/pages/contact": "/work-with-me",
		"/pages/speaking": "/speaking",
		"/pages/consulting": "/work-with-me",
		"/pages/marketing-mentor": "/work-with-me",
		"/pages/free-website-consult": "/work-with-me",
		"/pages/website-messaging-analysis": "/work-with-me",
		"/pages/newsletters": "/",
	},
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
			plugins: [cloudflareEmail],
			// Public address used for sign-in links and passkeys.
			siteUrl: "https://adamjwalker.com",
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Fraunces",
			cssVariable: "--font-display",
			weights: ["400 800"],
			styles: ["normal", "italic"],
			fallbacks: ["Georgia", "serif"],
		},
		{
			provider: fontProviders.google(),
			name: "Work Sans",
			cssVariable: "--font-body",
			weights: [400, 500, 600],
			fallbacks: ["system-ui", "sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "Caveat",
			cssVariable: "--font-hand",
			weights: [500, 700],
			fallbacks: ["cursive"],
		},
	],
	devToolbar: { enabled: false },
});
