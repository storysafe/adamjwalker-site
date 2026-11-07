import type { APIRoute } from "astro";
import { allVisiblePosts } from "../utils/all-posts";
import { CATEGORY_GROUPS } from "../categories";
import { PODCAST_URL, SUBSTACK_URL } from "../site.config";

export const prerender = false;

/** Plain-text summary of the site for AI tools (llms.txt). */
export const GET: APIRoute = async ({ url }) => {
	const o = url.origin;
	const posts = await allVisiblePosts();
	const recent = posts.slice(0, 40);
	const line = (title: string, href: string, note?: string | null) => `- [${title}](${href})${note ? `: ${note.replace(/\s+/g, " ").trim()}` : ""}`;

	const text = `# Adam Walker

> Marketing, tech & leadership, minus the hype. Adam Walker is a Fractional CMO and Technology Lead for nonprofits and growing businesses, Executive Director of 48in48, and co-host of the Tech Talk, Y'all podcast. Husband, father of five, and student of stoicism, based in Lilburn, Georgia.

Adam makes complex ideas and messages easy to understand. He has founded two marketing agencies (sold one), served as a nonprofit CMO, and led 48in48 as it built 1,700+ nonprofit websites over 11 years. His nonprofit consulting runs through Enable Good.

## Main pages

${line("Work with me", `${o}/work-with-me`, "Fractional CMO and Technology Lead engagements for businesses, plus technology and AI help for nonprofits through Enable Good.")}
${line("Speaking", `${o}/speaking`, "Talks and workshops on marketing, technology, and leadership; past events; booking.")}
${line("Now", `${o}/now`, "What Adam is focused on right now: work, projects, the podcast, reading, and home.")}
${line("Podcast & Companies", `${o}/podcast-and-companies`, "Tech Talk, Y'all, 48in48, Edgewise Media, Together Letters, and Enable Good.")}
${line("Writing", `${o}/writing`, "All essays, newest first.")}

## Writing topics

${CATEGORY_GROUPS.map((g) => line(g.label, `${o}/writing/category/${g.slug}`)).join("\n")}

## Recent writing

${recent.map(({ post }) => line(post.data.title, `${o}/writing/${post.id}`, post.data.excerpt)).join("\n")}

## Optional

${line("Full sitemap", `${o}/sitemap.xml`, `All ${posts.length} essays.`)}
${line("RSS feed", `${o}/rss.xml`)}
${line("Newsletter on Substack", SUBSTACK_URL)}
${line("Tech Talk, Y'all podcast", PODCAST_URL)}
`;
	return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
};
