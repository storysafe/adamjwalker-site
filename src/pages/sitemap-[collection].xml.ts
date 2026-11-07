import type { APIRoute } from "astro";

export const prerender = false;

/** EmDash's per-collection sitemaps are replaced by the single /sitemap.xml. */
export const GET: APIRoute = ({ redirect }) => redirect("/sitemap.xml", 301);
