import type { ComponentPropsWithoutRef } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { cn } from "@/lib/utils";

export type HeroPortraitCardProps = ComponentPropsWithoutRef<"div"> & {
	imageSrc: string;
	/** Intrinsic pixel size of `imageSrc` (passed to `<img width height>`). */
	imageWidth: number;
	imageHeight: number;
	/** Max width (px) of the frame; height is always 0.8 × width. */
	maxDisplayWidth?: number;
	imageAlt?: string;
	/** Small label overlapping the top edge (neo-brutalist badge). */
	label?: string;
	githubHref?: string;
	instagramHref?: string;
	linkedinHref?: string;
};

/** Offset “solid” shadow with reduced opacity */
const frameShadow = "shadow-[10px_10px_0_0_rgba(23,23,23,0.22)]";
const badgeShadow = "shadow-[6px_6px_0_0_rgba(23,23,23,0.2)]";

const socialBtnClass =
	"flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-neutral-950 bg-neutral-950/85 text-white shadow-[4px_4px_0_0_rgba(23,23,23,0.18)] transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

export function HeroPortraitCard({
	className,
	imageSrc,
	imageWidth,
	imageHeight,
	maxDisplayWidth = 280,
	imageAlt = "",
	label = "beyond tellerrand",
	githubHref = "https://github.com",
	instagramHref = "https://instagram.com",
	linkedinHref = "https://linkedin.com",
	...props
}: HeroPortraitCardProps) {
	return (
		<div
			className={cn("relative w-full max-w-full", className)}
			style={{ maxWidth: maxDisplayWidth }}
			{...props}
		>
			<div
				className={cn(
					"absolute -top-3 left-4 z-20 border-2 border-neutral-950 bg-white px-3 py-1.5",
					"rounded-tr-lg rounded-bl-lg",
					"font-semibold lowercase tracking-tight text-neutral-950",
					"text-[0.7rem] sm:text-xs",
					badgeShadow,
				)}
			>
				{label}
			</div>

			<div
				className={cn(
					"relative overflow-hidden rounded-tr-3xl rounded-bl-3xl border-2 border-neutral-950 bg-white",
					frameShadow,
				)}
			>
				<div className="bg-neutral-200">
					<img
						src={imageSrc}
						alt={imageAlt}
						width={imageWidth}
						height={imageHeight}
						className="block h-auto max-w-full grayscale"
						decoding="async"
					/>
				</div>

				<div className="pointer-events-auto absolute bottom-4 right-4 z-10 flex items-center gap-2">
					<a
						href={githubHref}
						target="_blank"
						rel="noopener noreferrer"
						className={socialBtnClass}
						aria-label="GitHub"
					>
						<FaGithub className="size-[1.1rem]" />
					</a>
					<a
						href={instagramHref}
						target="_blank"
						rel="noopener noreferrer"
						className={socialBtnClass}
						aria-label="Instagram"
					>
						<FaInstagram className="size-[1.05rem]" />
					</a>
					<a
						href={linkedinHref}
						target="_blank"
						rel="noopener noreferrer"
						className={socialBtnClass}
						aria-label="LinkedIn"
					>
						<FaLinkedinIn className="size-[1.05rem]" />
					</a>
				</div>
			</div>
		</div>
	);
}
