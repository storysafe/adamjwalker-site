/**
 * Site-wide settings that live in code (not the CMS).
 * Fill in the TODO values before launch.
 */

/** TODO: your Substack subdomain, e.g. "adamjwalker" for adamjwalker.substack.com */
export const SUBSTACK_SUBDOMAIN = "adamjwalker";

/** Signup forms post here and open Substack's confirmation in a new tab. */
export const SUBSTACK_SIGNUP_URL = `https://${SUBSTACK_SUBDOMAIN}.substack.com/api/v1/free`;
export const SUBSTACK_URL = `https://${SUBSTACK_SUBDOMAIN}.substack.com`;

/**
 * TODO: contact and speaking forms post to /api/contact, which needs a
 * delivery service (e.g. Cloudflare Email Routing or Resend) before launch.
 */
export const CONTACT_ENDPOINT = "/api/contact";

export const NAV = [
	{ label: "Writing", href: "/writing" },
	{ label: "Podcast & Companies", href: "/podcast-and-companies" },
	{ label: "Work with me", href: "/work-with-me" },
	{ label: "Speaking", href: "/speaking" },
	{ label: "Now", href: "/now" },
];

/** TODO: confirm each profile URL. */
export const SOCIAL = [
	{ label: "Substack", href: SUBSTACK_URL },
	{ label: "YouTube", href: "https://www.youtube.com/" },
	{ label: "TikTok", href: "https://www.tiktok.com/" },
	{ label: "Instagram", href: "https://www.instagram.com/" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/" },
];

export const PODCAST_URL = "https://techtalkyall.com";
export const ENABLE_GOOD_URL = "https://enablegood.io";
export const TOGETHER_LETTERS_URL = "https://togetherletters.com";
export const EDGEWISE_URL = "https://getaword.in";
