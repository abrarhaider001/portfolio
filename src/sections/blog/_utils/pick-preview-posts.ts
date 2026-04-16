import type { PostMeta } from "@/sections/blog/_server/posts";

const SOFTWARE_TAG = "software-development";

/**
 * Prefer posts tagged `software-development`; otherwise use the full list.
 * Returns up to `count` posts in random order (Fisher–Yates shuffle).
 */
export function pickRandomPreviewPosts(
	all: PostMeta[],
	count: number,
): PostMeta[] {
	const tagged = all.filter((p) => (p.tags ?? []).includes(SOFTWARE_TAG));
	const pool = tagged.length >= count ? tagged : all;
	const copy = [...pool];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j]!, copy[i]!];
	}
	return copy.slice(0, Math.min(count, copy.length));
}
