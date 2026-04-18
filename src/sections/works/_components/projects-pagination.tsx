"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
	getPageSliceBounds,
	getPaginationItems,
} from "@/sections/works/_utils/pagination";

type ProjectsPaginationProps = {
	currentPage: number;
	totalItems: number;
	pageSize: number;
	onPageChange: (page: number) => void;
	className?: string;
	/** If set, the “of N results” count uses this (e.g. full catalog) while paging still uses `totalItems`. */
	totalResultsLabel?: number;
};

export function ProjectsPagination({
	currentPage,
	totalItems,
	pageSize,
	onPageChange,
	className,
	totalResultsLabel,
}: ProjectsPaginationProps) {
	const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
	const safePage = Math.min(Math.max(1, currentPage), totalPages);
	const { start, end } = getPageSliceBounds(safePage, pageSize, totalItems);
	const ofTotal = totalResultsLabel ?? totalItems;
	const items = getPaginationItems(safePage, totalPages, 1);

	const go = (page: number) => {
		const next = Math.min(Math.max(1, page), totalPages);
		if (next !== currentPage) onPageChange(next);
	};

	if (totalItems === 0) {
		return null;
	}

	return (
		<div
			className={cn(
				"flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				className,
			)}
		>
			<p className="text-sm font-medium leading-snug text-foreground/60 sm:flex sm:h-8 sm:items-center sm:leading-none">
				Showing {start} to {end} of {ofTotal} results
			</p>

			<div className="flex flex-wrap items-center gap-2 sm:justify-end">
				{/* h-8 matches project card `Button size="sm"` (View project) */}
				<div className="inline-flex h-8 items-stretch overflow-hidden rounded-lg border border-border bg-card shadow-sm">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="min-w-8 rounded-none border-0 border-r border-border px-0 text-foreground/80 hover:bg-muted/50 hover:text-foreground disabled:opacity-40"
						aria-label="Previous page"
						disabled={safePage <= 1}
						onClick={() => go(safePage - 1)}
					>
						<Icons.ChevronLeft className="size-4" aria-hidden />
					</Button>

					{items.map((item, idx) =>
						item === "ellipsis" ? (
							<span
								key={`e-${idx}`}
								className="flex min-h-8 min-w-8 items-center justify-center border-r border-border px-1 text-sm leading-none text-foreground/50"
								aria-hidden
							>
								…
							</span>
						) : (
							<Button
								type="button"
								key={item}
								variant="ghost"
								size="sm"
								className={cn(
									"min-w-8 rounded-none border-0 border-r border-border px-0 text-sm font-medium leading-none last:border-r-0",
									item === safePage
										? "bg-foreground text-background hover:bg-foreground hover:text-background"
										: "text-foreground/80 hover:bg-muted/50 hover:text-foreground",
								)}
								aria-label={`Page ${item}`}
								aria-current={item === safePage ? "page" : undefined}
								onClick={() => go(item)}
							>
								{item}
							</Button>
						),
					)}

					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="min-w-8 rounded-none border-0 px-0 text-foreground/80 hover:bg-muted/50 hover:text-foreground disabled:opacity-40"
						aria-label="Next page"
						disabled={safePage >= totalPages}
						onClick={() => go(safePage + 1)}
					>
						<Icons.ChevronRight className="size-4" aria-hidden />
					</Button>
				</div>
			</div>
		</div>
	);
}
