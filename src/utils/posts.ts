import { getTermsForEntries } from "emdash";
import type { ContentEntry, InferCollectionData } from "emdash";
import { groupForPost, isHidden } from "../categories";

type Post = ContentEntry<InferCollectionData<"posts">>;

export interface PostWithGroup {
	post: Post;
	category: { slug: string; label: string } | null;
	hidden: boolean;
}

/** Attach each post's display group and hidden flag (one batched query). */
export async function withCategories(posts: Post[]): Promise<PostWithGroup[]> {
	if (posts.length === 0) return [];
	const byEntry = await getTermsForEntries(
		"posts",
		posts.map((p) => p.data.id),
		"category",
	);
	return posts.map((post) => {
		const slugs = (byEntry.get(post.data.id) ?? []).map((t) => t.slug);
		const g = groupForPost(slugs);
		return { post, category: g ? { slug: g.slug, label: g.label } : null, hidden: isHidden(slugs) };
	});
}

/** Same as withCategories, minus hidden posts. */
export async function visiblePosts(posts: Post[]) {
	return (await withCategories(posts)).filter((p) => !p.hidden);
}
