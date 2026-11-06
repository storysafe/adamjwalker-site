import { getTermsForEntries } from "emdash";
import type { ContentEntry, InferCollectionData } from "emdash";

type Post = ContentEntry<InferCollectionData<"posts">>;

/** Attach each post's first category (one batched query). */
export async function withCategories(posts: Post[]) {
	if (posts.length === 0) return [];
	const byEntry = await getTermsForEntries(
		"posts",
		posts.map((p) => p.data.id),
		"category",
	);
	return posts.map((post) => {
		const term = byEntry.get(post.data.id)?.[0];
		return { post, category: term ? { slug: term.slug, label: term.label } : null };
	});
}
