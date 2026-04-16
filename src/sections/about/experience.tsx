import { ResumeIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";

const roles = [
	{
		title: "Mobile App Developer",
		period: "Nov 2025 – Jan 2026",
		org: "Innovaxel",
		location: "Lahore, Pakistan",
		summary:
			"I worked inside a product-focused team shipping Flutter apps to real users, not throwaway demos. The emphasis was on architecture that could grow with new screens and integrations, while keeping UI states predictable and testable.",
		points: [
			"I built and refactored production Flutter features with a clear separation between presentation, domain logic, and data layers so screens stayed readable as requirements changed.",
			"I integrated REST APIs end to end: modeling payloads, handling errors and loading states, and tightening rebuild scope so lists and forms stayed responsive on mid-range devices.",
			"I improved perceived performance by profiling widget rebuilds, caching where it made sense, and aligning state management with navigation flows so users rarely saw jank during transitions.",
		],
	},
	{
		title: "Flutter Developer",
		period: "Nov 2025 – Jan 2026",
		org: "TIERS Limited",
		location: "Remote (USA)",
		summary:
			"This role stretched me across time zones and expectations: short feedback loops, written clarity in tickets and PRs, and shipping increments that stakeholders could try every few days.",
		points: [
			"I delivered cross-platform Flutter work using GetX and Provider where each pattern fit the feature—favoring explicit dependencies and lifecycle handling over clever shortcuts that would confuse the next contributor.",
			"I collaborated with designers and backend engineers in an agile cadence: clarifying acceptance criteria up front, surfacing edge cases early, and keeping commits small enough to review honestly.",
			"I contributed to shared conventions—folder structure, naming, and error handling—so remote teammates could onboard a module without a synchronous walkthrough every time.",
		],
	},
	{
		title: "Web Development",
		period: "Jul 2025 – Sep 2025",
		org: "Digital Empowerment Network",
		location: "Remote",
		summary:
			"Here I strengthened the foundations I still rely on: semantic layout, accessible defaults, and working alongside others in a codebase where consistency matters more than personal style.",
		points: [
			"I designed and implemented responsive interfaces with HTML and CSS first—focusing on readable structure, flexible grids, and components that behaved predictably across breakpoints before adding behavior.",
			"I assisted with backend integration: tracing requests through the stack, reproducing bugs with minimal steps, and documenting fixes so similar issues were faster to diagnose the next time.",
			"I supported debugging workflows by pairing on reproduction, validating fixes against staging data, and tightening checklists so regressions were less likely to slip through informal handoffs.",
		],
	},
] as const;

export default function Experience() {
	return (
		<Section
			id="experience"
			title="Experience"
			description="Across Lahore and remote teams in the United States, I have shipped mobile and web work where clarity, pace, and ownership matter. Each engagement reinforced the same habits: ask what “done” means for the user, keep architecture honest as scope grows, and communicate in writing so async collaboration stays fast."
			descriptionClassName="md:max-w-3xl"
			className="flex flex-col gap-10"
			badgeText="Experience"
			badgeIcon={<ResumeIcon aria-hidden="true" className="size-3.5" />}
		>
			<div className="flex max-w-3xl flex-col gap-12">
				{roles.map((role) => (
					<article
						key={`${role.org}-${role.title}`}
						className="flex flex-col gap-4 border-border/60 border-b pb-12 last:border-b-0 last:pb-0"
					>
						<header className="flex flex-col gap-1">
							<h3 className="text-lg font-medium text-balance text-foreground md:text-xl">
								{role.title}
							</h3>
							<p className="text-sm font-medium text-foreground/60 md:text-base">
								{role.period}
							</p>
							<p className="text-sm font-medium text-foreground/80 md:text-base">
								{role.org} — {role.location}
							</p>
						</header>
						<p className="text-base font-medium leading-relaxed text-foreground/70 md:text-lg">
							{role.summary}
						</p>
						<ul className="flex list-disc flex-col gap-3 pl-5 text-base font-medium leading-relaxed text-foreground/70 marker:text-foreground/40 md:text-lg">
							{role.points.map((point, index) => (
								<li
									key={`${role.org}-${role.title}-${index}`}
									className="text-pretty"
								>
									{point}
								</li>
							))}
						</ul>
					</article>
				))}
			</div>
		</Section>
	);
}
