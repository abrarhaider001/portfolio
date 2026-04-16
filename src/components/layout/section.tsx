import type { ReactNode } from "react";

import { ShinyBadge } from "@/components/ui/shiny-badge";
import { cn } from "@/lib/utils";

type SectionProps = {
	children: ReactNode;
	title?: string;
	description?: string;
	className?: string;
	wrapperClassName?: string;
	id?: string;
	badgeText?: string;
	badgeIcon?: ReactNode;
};

export default function Section({
	children,
	title,
	description,
	className,
	wrapperClassName,
	id,
	badgeText,
	badgeIcon,
}: SectionProps) {
	return (
		<section
			id={id}
			className={`flex w-full flex-col items-start justify-start divide-y divide-border/80 divide-dashed ${wrapperClassName ?? ""}`}
		>
			{badgeText || title || description ? (
				<div className="flex w-full flex-col gap-2 px-6 py-8 md:px-24 lg:px-32">
					{badgeText ? (
						<div className="w-fit">
							<ShinyBadge>
								{badgeIcon}
								{badgeText}
							</ShinyBadge>
						</div>
					) : null}
					{title ? (
						<h2 className="text-xl md:text-2xl text-foreground font-medium text-balance leading-none">
							{title}
						</h2>
					) : null}
					{description ? (
						<p className="text-base text-foreground/70 font-medium text-balance leading-relaxed md:max-w-1/2">
							{description}
						</p>
					) : null}
				</div>
			) : null}
			<div
				className={cn(
					"relative h-full w-full px-6 py-4 md:px-24 md:py-8 lg:px-32",
					className,
				)}
			>
				{children}
			</div>
		</section>
	);
}
