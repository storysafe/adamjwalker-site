/**
 * Display categories. Posts keep their original WordPress categories in the
 * CMS; the site groups them into these. Edit `members` to move an old
 * category into a different group. Order sets priority when a post belongs to
 * more than one group (first match wins).
 */
export interface CategoryGroup {
	slug: string;
	label: string;
	members: string[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
	{ slug: "marketing", label: "Marketing", members: ["marketing", "business"] },
	{ slug: "technology", label: "Technology", members: ["technology", "tech-talk-yall"] },
	{
		slug: "leadership",
		label: "Leadership",
		members: ["leadership", "productivity", "habit-building", "life-hacking", "busyness", "the-family-man-entrepreneur"],
	},
	{
		slug: "family",
		label: "Family",
		members: ["family", "dad-stuff", "dad-time", "dad-kid-relations", "funny-kid-stuff", "adoption"],
	},
	{
		slug: "living",
		label: "Living / Perspective",
		members: ["living", "perspective", "personal", "random", "uncategorized"],
	},
];

/**
 * Hidden: posts in any of these categories stay reachable by direct link but
 * are left out of every list, the RSS feed, search, and related posts.
 */
export const HIDDEN_CATEGORIES = ["theology", "the-church", "jewish-roots"];

const bySlug = new Map(CATEGORY_GROUPS.map((g) => [g.slug, g]));
const byMember = new Map(CATEGORY_GROUPS.flatMap((g) => g.members.map((m) => [m, g] as const)));

export const VISIBLE_MEMBERS = CATEGORY_GROUPS.flatMap((g) => g.members);

export function getGroup(slug: string): CategoryGroup | undefined {
	return bySlug.get(slug);
}

/** Group for an old or new category slug (old slugs map to their group). */
export function groupForMember(slug: string): CategoryGroup | undefined {
	return byMember.get(slug) ?? bySlug.get(slug);
}

/** Pick the display group for a post from its category slugs. */
export function groupForPost(slugs: string[]): CategoryGroup | null {
	for (const g of CATEGORY_GROUPS) if (slugs.some((s) => g.members.includes(s))) return g;
	return null;
}

export function isHidden(slugs: string[]): boolean {
	return slugs.some((s) => HIDDEN_CATEGORIES.includes(s));
}
