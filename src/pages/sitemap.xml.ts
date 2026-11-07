import type { APIRoute } from "astro";
import { allVisiblePosts } from "../utils/all-posts";
import { CATEGORY_GROUPS } from "../categories";

export const prerender = false;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** One sitemap: the main pages, writing topics, and every visible post (hidden categories left out). */
export const GET: APIRoute = async ({ url }) => {
	const origin = url.origin;
	const posts = await allVisiblePosts();
	const newest = posts[0]?.post.data.updatedAt ?? posts[0]?.post.data.publishedAt;
	const pages = ["/", "/writing", "/work-with-me", "/speaking", "/now", "/podcast-and-companies"];
	const rows = [
		...pages.map((p) => ({ loc: origin + p, lastmod: p === "/" || p === "/writing" ? newest : undefined })),
		...CATEGORY_GROUPS.map((g) => ({ loc: `${origin}/writing/category/${g.slug}`, lastmod: undefined })),
		...posts.map(({ post }) => ({ loc: `${origin}/writing/${post.id}`, lastmod: post.data.updatedAt ?? post.data.publishedAt })),
	];
	const body =
		'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
		rows
			.map((r) => `  <url><loc>${esc(r.loc)}</loc>${r.lastmod ? `<lastmod>${new Date(r.lastmod).toISOString()}</lastmod>` : ""}</url>`)
			.join("\n") +
		"\n</urlset>\n";
	return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
};
