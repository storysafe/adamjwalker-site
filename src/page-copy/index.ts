import { getEmDashEntry } from "emdash";
import { DEFAULTS } from "./definitions.mjs";

type AstroLike = { cache?: { enabled?: boolean; set(hint: unknown): void } };

function isEmpty(value: unknown) {
	return value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
}

/**
 * Load a page's editable copy. `v(field)` returns the saved value (or the
 * built-in default if the entry or field is empty); `e(field)` returns the
 * attributes that make that element editable in the on-page editor.
 */
export async function getPageCopy(astro: AstroLike, collection: keyof typeof DEFAULTS) {
	const defaults = DEFAULTS[collection] as Record<string, any>;
	let entry: any = null;
	try {
		const result = await getEmDashEntry(collection as any, "main");
		entry = result.entry;
		if (result.cacheHint && astro.cache?.enabled) astro.cache.set(result.cacheHint);
	} catch {
		entry = null;
	}
	const data = (entry?.data ?? {}) as Record<string, any>;
	const v = (field: string): any => (isEmpty(data[field]) ? defaults[field] : data[field]);
	const e = (field: string): Record<string, unknown> => (entry ? entry.edit[field] : {});
	return { v, e, entry };
}
