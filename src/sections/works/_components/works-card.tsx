"use client";

import { useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface WorksCardProps {
	images: string[];
	title: string;
	description: string;
	technologies: string[];
	link: string;
}

export default function WorksCard({
	images,
	title,
	description,
	technologies,
	link,
}: WorksCardProps) {
	const [index, setIndex] = useState(0);
	const count = images.length;
	const safeIndex = count > 0 ? Math.min(index, count - 1) : 0;
	const currentSrc = images[safeIndex] ?? "";
	const showNav = count > 1;

	const goPrev = useCallback(() => {
		setIndex((i) => (i - 1 + count) % count);
	}, [count]);

	const goNext = useCallback(() => {
		setIndex((i) => (i + 1) % count);
	}, [count]);

	return (
		<Card className="w-full overflow-hidden border-border/80 bg-card">
			<div className="flex min-h-[20rem] flex-col md:min-h-[24rem] md:flex-row md:items-stretch lg:min-h-[28rem]">

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
								<Badge key={tech} variant="secondary" size="sm" className="font-normal">
									{tech}
								</Badge>
							))}
						</div>
					</div>

					<div className="flex shrink-0 pt-1">
						<Button asChild size="sm">
							<a href={link} target="_blank" rel="noreferrer">
								View project
							</a>
						</Button>
					</div>
				</div>

				{/* RIGHT SIDE (FIXED STRUCTURE) */}
				<div
					className={cn(
						"relative flex min-h-[14rem] w-full shrink-0 flex-col",
						"border-t border-border/60 bg-muted/20",
						"md:min-h-0 md:w-[min(45%,28rem)] md:flex-1 md:border-t-0",
					)}
				>
					<div className="relative flex h-full min-h-[12rem] flex-1 flex-col md:min-h-0">
						{showNav ? (
							<Button
								type="button"
								variant="icon"
								size="md"
								className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-card shadow-md"
								aria-label="Previous image"
								onClick={goPrev}
							>
								<Icons.ChevronLeft className="size-4" aria-hidden />
							</Button>
						) : null}

						<div className="relative my-3 mr-3 min-h-0 flex-1 overflow-hidden rounded-2xl border border-border/50 bg-card-elevated shadow-sm">

							{count > 0 ? (
								<div className="absolute top-3 left-1/2 z-10 -translate-x-1/2">
									<Badge
										variant="secondary"
										size="sm"
										className="border border-border/60 bg-popover/95 font-medium shadow-sm backdrop-blur-sm"
									>
										{safeIndex + 1} / {count}
									</Badge>
								</div>
							) : null}

							{currentSrc ? (
								<img
									src={currentSrc}
									alt={`${title} — image ${safeIndex + 1} of ${count}`}
									width={1920}
									height={1080}
									className="size-full min-h-[12rem] object-cover object-center md:min-h-0"
								/>
							) : null}
						</div>

						{showNav ? (
							<Button
								type="button"
								variant="icon"
								size="md"
								className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-card shadow-md"
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