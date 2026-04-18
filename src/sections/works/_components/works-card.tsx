"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { WorksImageBackdrop } from "@/sections/works/_constants/works";

/** OG-style project preview ratio (e.g. 1200×630). */
const PROJECT_IMAGE_RATIO = 1200 / 630;

interface WorksCardProps {
	images: string[];
	title: string;
	description: string;
	technologies: string[];
	link: string;
	imageBackdrop?: WorksImageBackdrop;
}

export default function WorksCard({
	images,
	title,
	description,
	technologies,
	link,
	imageBackdrop,
}: WorksCardProps) {
	const [index, setIndex] = useState(0);
	const count = images.length;
	const safeIndex = count > 0 ? Math.min(index, count - 1) : 0;
	const showNav = count > 1;
	const canGoPrev = showNav && safeIndex > 0;
	const canGoNext = showNav && safeIndex < count - 1;

	const isExternalLink =
		link.startsWith("http://") || link.startsWith("https://");

	const goPrev = useCallback(() => {
		setIndex((i) => Math.max(0, i - 1));
	}, []);

	const goNext = useCallback(() => {
		setIndex((i) => Math.min(count - 1, i + 1));
	}, [count]);

	return (
		<Card className="w-full overflow-hidden border-border/80 bg-card">
			<div className="flex min-h-0 flex-col md:flex-row md:items-stretch">
				{/* LEFT SIDE */}
				<div className="flex min-w-0 flex-1 flex-col justify-between gap-6 p-6 sm:p-8 md:max-w-[55%] md:p-9 lg:gap-8 lg:p-10">
					<div className="space-y-3">
						<CardTitle className="text-lg font-medium text-foreground sm:text-xl">
							{title}
						</CardTitle>

						<CardDescription className="text-sm leading-relaxed text-foreground/65">
							{description}
						</CardDescription>

						<div className="flex flex-wrap gap-2 pt-1">
							{technologies.map((tech) => (
								<Badge
									key={tech}
									variant="secondary"
									size="sm"
									className="font-normal"
								>
									{tech}
								</Badge>
							))}
						</div>
					</div>

					<div className="flex shrink-0 pt-1">
						<Button asChild size="sm">
							<a
								href={link}
								{...(isExternalLink
									? { target: "_blank", rel: "noreferrer" }
									: {})}
							>
								View project
							</a>
						</Button>
					</div>
				</div>

				{/* IMAGE — 1200×630 frame, symmetric padding on mobile */}
				<div
					className={cn(
						"relative flex w-full shrink-0 flex-col",
						"border-t border-border/60 bg-muted/20",
						"px-3 pb-3 pt-3 md:min-h-0 md:w-[min(45%,28rem)] md:flex-1 md:border-t-0 md:px-3 md:py-3",
					)}
				>
					<div
						className="relative w-full overflow-hidden rounded-2xl border border-border/50 bg-card-elevated shadow-sm"
						style={{ aspectRatio: PROJECT_IMAGE_RATIO }}
					>
						{imageBackdrop ? (
							<div
								className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
								aria-hidden
							>
								<div
									className="absolute left-1/2 top-[46%] w-[min(132%,26rem)] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.38] blur-[52px] md:w-[min(140%,32rem)] md:blur-[68px]"
									style={{
										aspectRatio: "1",
										background: `radial-gradient(circle at 50% 50%, ${imageBackdrop.accent} 0%, transparent 68%)`,
									}}
								/>
								<div
									className="absolute left-[58%] top-[58%] w-[min(100%,20rem)] max-w-[75vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.22] blur-[44px] md:blur-[56px]"
									style={{
										aspectRatio: "1",
										background: `radial-gradient(circle at 50% 50%, ${imageBackdrop.accentSoft ?? imageBackdrop.accent} 0%, transparent 72%)`,
									}}
								/>
							</div>
						) : null}

						{count > 0 ? (
							<div className="relative z-10 h-full w-full min-h-0 overflow-hidden">
								<motion.div
									className="flex h-full"
									style={{ width: `${count * 100}%` }}
									initial={false}
									animate={{
										x: `${-(safeIndex * 100) / count}%`,
									}}
									transition={{
										duration: 0.42,
										ease: [0.22, 1, 0.36, 1],
									}}
								>
									{images.map((src, i) => (
										<div
											key={`${title}-${i}-${src}`}
											className="relative h-full shrink-0 overflow-hidden"
											style={{ width: `${100 / count}%` }}
										>
											<img
												src={src}
												alt={`${title} — image ${i + 1} of ${count}`}
												width={1200}
												height={630}
												className="absolute inset-0 size-full object-cover object-center"
												decoding="async"
												draggable={false}
											/>
										</div>
									))}
								</motion.div>
							</div>
						) : null}

						{canGoPrev ? (
							<Button
								type="button"
								variant="icon"
								size="md"
								className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-card/95 shadow-md backdrop-blur-sm md:left-3"
								aria-label="Previous image"
								onClick={goPrev}
							>
								<Icons.ChevronLeft className="size-4" aria-hidden />
							</Button>
						) : null}

						{canGoNext ? (
							<Button
								type="button"
								variant="icon"
								size="md"
								className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-card/95 shadow-md backdrop-blur-sm md:right-3"
								aria-label="Next image"
								onClick={goNext}
							>
								<Icons.ChevronRight className="size-4" aria-hidden />
							</Button>
						) : null}
					</div>
				</div>
			</div>
		</Card>
	);
}
