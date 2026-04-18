"use client";

import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectsPagination } from "@/sections/works/_components/projects-pagination";
import WorksCard from "@/sections/works/_components/works-card";
import { useLenis } from "@/lib/lenis-context";
import {
	WORKS_PAGE_SIZE,
	type WorksItem,
	works,
} from "@/sections/works/_constants/works";
import { getPageSliceBounds } from "@/sections/works/_utils/pagination";

const SLIDE = 56;
const EASE = [0.22, 1, 0.36, 1] as const;

const listVariants = {
	enter: (dir: number) => ({
		x: dir > 0 ? SLIDE : dir < 0 ? -SLIDE : 0,
		opacity: dir === 0 ? 1 : 0,
	}),
	center: { x: 0, opacity: 1 },
	exit: (dir: number) => ({
		x: dir > 0 ? -SLIDE : dir < 0 ? SLIDE : 0,
		opacity: dir === 0 ? 1 : 0,
	}),
};

type WorksProjectsClientProps = {
	/** When true, shows a “View all” link to `/projects` under the list. */
	showViewAll?: boolean;
	/** Subset to render (e.g. home preview). Defaults to the full {@link works} list. */
	dataset?: WorksItem[];
	/** Overrides page size when `dataset` is used (e.g. home = 4). */
	pageSize?: number;
	/** Total **X** in “Showing … of X results” when it differs from `dataset` length (optional). */
	totalResultsLabel?: number;
	/** Section id to scroll to when changing page (`#works` on home, `#projects` on /projects). */
	scrollAnchorId?: string;
};

export default function WorksProjectsClient({
	showViewAll = false,
	dataset,
	pageSize: pageSizeProp,
	totalResultsLabel: totalResultsLabelProp,
	scrollAnchorId = "works",
}: WorksProjectsClientProps) {
	const { scrollTo } = useLenis();
	const list = dataset ?? works;
	const pageSize = pageSizeProp ?? WORKS_PAGE_SIZE;
	const [page, setPage] = useState(1);
	const [direction, setDirection] = useState(0);
	const total = list.length;
	const totalResultsLabel = totalResultsLabelProp ?? total;

	const visible = useMemo(() => {
		const { from, to } = getPageSliceBounds(page, pageSize, total);
		return list.slice(from, to);
	}, [page, total, list, pageSize]);

	const handlePageChange = useCallback(
		(next: number) => {
			if (next === page) return;
			setDirection(next > page ? 1 : -1);
			setPage(next);
			const anchor = `#${scrollAnchorId}`;
			requestAnimationFrame(() => {
				scrollTo(anchor, {
					duration: 0.55,
					offset: -88,
				});
			});
		},
		[page, scrollTo, scrollAnchorId],
	);

	return (
		<div className="flex w-full flex-col gap-6">
			<div className="relative overflow-hidden">
				<AnimatePresence initial={false} mode="wait">
					<motion.div
						key={page}
						custom={direction}
						variants={listVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							duration: 0.38,
							ease: EASE,
						}}
						className="flex flex-col gap-4"
					>
						{visible.map((item: WorksItem) => (
							<WorksCard
								key={item.id}
								images={item.images}
								title={item.title}
								description={item.description}
								technologies={item.technologies}
								link={item.link}
								imageBackdrop={item.imageBackdrop}
							/>
						))}
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="flex flex-col gap-4 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
				<ProjectsPagination
					currentPage={page}
					totalItems={total}
					pageSize={pageSize}
					onPageChange={handlePageChange}
					className="sm:flex-1"
					totalResultsLabel={totalResultsLabel}
				/>
				{showViewAll ? (
					<Button asChild size="sm" className="shrink-0 self-start sm:self-center">
						<Link to="/projects">View all</Link>
					</Button>
				) : null}
			</div>
		</div>
	);
}
