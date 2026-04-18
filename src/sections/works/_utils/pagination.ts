/** 1-based page numbers and `"ellipsis"` gaps (e.g. `1 … 4 5 6 … 10`). */
export type PaginationItem = number | "ellipsis";

/**
 * Builds a compact page list with ellipses (delta = pages on each side of current).
 */
export function getPaginationItems(
	currentPage: number,
	totalPages: number,
	delta = 1,
): PaginationItem[] {
	if (totalPages < 1) return [];
	if (totalPages === 1) return [1];

	const range: number[] = [];
	for (let i = 1; i <= totalPages; i++) {
		if (
			i === 1 ||
			i === totalPages ||
			(i >= currentPage - delta && i <= currentPage + delta)
		) {
			range.push(i);
		}
	}

	const out: PaginationItem[] = [];
	let prev = 0;
	for (const p of range) {
		if (prev && p - prev > 1) {
			out.push("ellipsis");
		}
		out.push(p);
		prev = p;
	}
	return out;
}

export function getPageSliceBounds(
	currentPage: number,
	pageSize: number,
	totalItems: number,
): { start: number; end: number; from: number; to: number } {
	const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
	const safePage = Math.min(Math.max(1, currentPage), totalPages);
	const from = (safePage - 1) * pageSize;
	const to = Math.min(from + pageSize, totalItems);
	const start = totalItems === 0 ? 0 : from + 1;
	const end = to;
	return { start, end, from, to };
}
