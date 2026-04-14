"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { ConvertingCardContent } from "@/sections/services/_components/converting-card-content";
import { convertingCardIcons } from "@/sections/services/_constants/services";
import { cn } from "@/lib/utils";

type HeroWorkflowProps = ComponentPropsWithoutRef<"div">;

export const HeroWorkflow = forwardRef<HTMLDivElement, HeroWorkflowProps>(
	function HeroWorkflow({ className, ...props }, ref) {
		return (
			<div
				ref={ref}
				className={cn("relative w-full max-w-md justify-self-end", className)}
				{...props}
			>
				<div className="rounded-2xl border border-border/80 bg-card/75 p-3 shadow-sm backdrop-blur-sm md:p-4">
					<p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-foreground/55 md:text-left">
						From design to build
					</p>
					<ConvertingCardContent
						icons={convertingCardIcons}
						className="min-h-[200px] py-2 md:min-h-[220px]"
					/>
				</div>
			</div>
		);
	},
);
