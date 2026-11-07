import { getEmDashCollection } from "emdash";
import { visiblePosts } from "./posts";

/** Every published post that isn't in a hidden category, newest first. */
export async function allVisiblePosts() {
	const all = [];
	let cursor: string | undefined;
	for (let i = 0; i < 50; i++) {
		const { entries, nextCursor } = await getEmDashCollection("posts", {
			orderBy: { published_at: "desc" },
			limit: 100,
			...(cursor ? { cursor } : {}),
		});
		all.push(...entries);
		if (!nextCursor) break;
		cursor = nextCursor;
	}
	return visiblePosts(all);
}
