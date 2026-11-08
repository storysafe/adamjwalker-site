/**
 * A short plain-text summary of a post for search results, AI tools, and link
 * previews: the post's excerpt if it has one, otherwise its opening sentences.
 */
export function summarize(content: unknown, excerpt?: string | null, max = 160): string | undefined {
	if (excerpt && excerpt.trim()) return excerpt.trim();
	if (!Array.isArray(content)) return undefined;
	const text = content
		.filter((b: any) => b?._type === "block" && Array.isArray(b.children))
		.map((b: any) => b.children.map((c: any) => (typeof c?.text === "string" ? c.text : "")).join(""))
		.join(" ")
		.replace(/\s+/g, " ")
		.trim();
	if (!text) return undefined;
	if (text.length <= max) return text;
	// Whole sentences that fit, if any.
	const sentences = text.match(/.+?[.!?]+["”’)]*(?:\s+|$)/g) ?? [];
	let out = "";
	for (const s of sentences) {
		if ((out + s).trim().length > max) break;
		out += s;
	}
	if (out.trim().length >= 60) return out.trim();
	// Otherwise cut at a word boundary.
	const cut = text.slice(0, max - 1);
	return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\-–—]$/, "") + "…";
}
