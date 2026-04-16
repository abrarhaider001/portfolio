import { Link } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { LogoIcon } from "@/components/icons/logo-icon";
import { useLenis } from "@/lib/lenis-context";
import {
	footerAuthor,
	footerLinks,
	footerSecondaryLinks,
	footerSocialLinks,
	type FooterLink,
} from "@/sections/footer/_constants/footer";

function FooterNavLink({ link }: { link: FooterLink }) {
	const { scrollTo } = useLenis();

	const className =
		"rounded text-xs text-foreground/70 transition-[color,shadow] duration-100 ease-out-quad hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50";

	if (link.href.startsWith("#")) {
		return (
			<a
				href={link.href}
				className={className}
				onClick={(event: MouseEvent<HTMLAnchorElement>) => {
					event.preventDefault();
					scrollTo(link.href);
				}}
			>
				{link.label}
			</a>
		);
	}

	return (
		<Link to={link.href} className={className}>
			{link.label}
		</Link>
	);
}

function FooterLinkColumn({
	title,
	links,
}: {
	title: string;
	links: FooterLink[];
}) {
	return (
		<div className="flex flex-col gap-2">
			<p className="text-xs font-medium text-foreground">{title}</p>
			<ul className="space-y-2">
				{links.map((link) => (
					<li key={`${title}-${link.label}`}>
						<FooterNavLink link={link} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full">
			<div className="mx-auto grid w-full grid-cols-1 gap-10 px-6 py-8 sm:grid-cols-2 md:px-24 md:py-8 lg:grid-cols-[minmax(0,1.6fr)_auto_auto] lg:gap-16 lg:px-32">
				<div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-2 text-foreground">
							<LogoIcon className="size-4 shrink-0" />
							<p className="text-sm font-medium">{footerAuthor.displayName}</p>
						</div>
						<p className="max-w-sm text-xs leading-relaxed text-foreground/70">
							{footerAuthor.bio}
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						{footerSocialLinks.map(({ label, href, icon: Icon }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noreferrer"
								aria-label={label}
								className="flex size-10 items-center justify-center rounded-md border border-border/80 bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)] text-foreground/80 transition-[color,box-shadow] duration-100 ease-out-quad hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50"
							>
								<Icon aria-hidden="true" className="size-5" />
							</a>
						))}
					</div>
				</div>

				<FooterLinkColumn title="Navigation" links={footerLinks} />
				<FooterLinkColumn title="Resources" links={footerSecondaryLinks} />
			</div>

			<div className="border-t border-border/80 text-xs text-foreground/70">
				<div className="mx-auto flex w-full flex-col items-start justify-between gap-2 px-6 py-4 md:flex-row md:items-center md:px-24 lg:px-32">
					<p>
						© {currentYear} {footerAuthor.displayName}. All rights reserved.
					</p>
					<p className="max-w-md text-pretty md:text-right">
						Open to freelance, contract, and long-term product work worldwide.
					</p>
				</div>
			</div>
		</footer>
	);
}
