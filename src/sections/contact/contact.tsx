import {
	EnvelopeClosedIcon,
	HomeIcon,
	MobileIcon,
	PaperPlaneIcon,
} from "@radix-ui/react-icons";
import type { ComponentType, SVGProps } from "react";
import Section from "@/components/layout/section";
import { cn } from "@/lib/utils";
import ContactFormCard from "@/sections/contact/_components/contact-form-card";
import { GridPattern } from "@/sections/contact/_components/grid-pattern";
import { contactDetailItems } from "@/sections/contact/_constants/contact-details";

const contactDetailIcons: Record<
	string,
	ComponentType<SVGProps<SVGSVGElement>>
> = {
	location: HomeIcon,
	phone: MobileIcon,
	email: EnvelopeClosedIcon,
};

export default function Contact() {
	return (
		<Section
			id="contact"
			className="overflow-hidden"
			badgeText="Contact"
			badgeIcon={<PaperPlaneIcon aria-hidden="true" className="size-3.5" />}
		>
			<div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
				<div className="flex min-w-0 flex-1 flex-col gap-8 text-left lg:max-w-md">
					<div className="flex flex-col gap-3">
						<h2 className="text-xl leading-none font-medium text-balance text-foreground md:text-2xl">
							Get in touch
						</h2>
						<p className="text-base font-medium leading-relaxed text-balance text-foreground/70">
							Tell me about your product, team, and timeline. I read every
							message and usually reply within two business days with next steps
							or a few clarifying questions.
						</p>
					</div>
					<ul className="flex flex-col gap-6">
						{contactDetailItems.map((item) => {
							const Icon = contactDetailIcons[item.id];
							const text = (
								<div className="flex min-w-0 flex-col gap-0.5">
									<span className="text-xs font-medium tracking-wide text-foreground/50 uppercase">
										{item.title}
									</span>
									{item.lines.map((line) => (
										<span
											key={line}
											className="block text-sm font-medium text-foreground"
										>
											{line}
										</span>
									))}
								</div>
							);

							const iconBox = (
								<span
									className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border/80 bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)] text-foreground/80"
									aria-hidden="true"
								>
									{Icon ? <Icon className="size-4" /> : null}
								</span>
							);

							return (
								<li key={item.id}>
									{item.href ? (
										<a
											href={item.href}
											className="flex gap-3 rounded transition-[color,opacity] duration-100 ease-out-quad hover:opacity-90 focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none"
											{...(item.external
												? { target: "_blank", rel: "noreferrer" }
												: {})}
										>
											{iconBox}
											{text}
										</a>
									) : (
										<div className="flex gap-3">
											{iconBox}
											{text}
										</div>
									)}
								</li>
							);
						})}
					</ul>
				</div>
				<div className="w-full shrink-0 lg:flex lg:max-w-xl lg:justify-end">
					<ContactFormCard />
				</div>
			</div>
			<GridPattern
				squares={[
					[4, 4],
					[5, 1],
					[8, 2],
					[5, 3],
					[5, 5],
					[10, 10],
					[12, 15],
					[15, 10],
					[10, 15],
					[15, 10],
					[10, 15],
					[15, 10],
				]}
				className={cn(
					"mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
					"inset-x-0 inset-y-[-30%] h-[150%] skew-y-12",
				)}
			/>
		</Section>
	);
}
