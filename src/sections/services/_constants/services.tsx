import {
	FigmaLogoIcon,
	FileIcon,
	FilePlusIcon,
	FileTextIcon,
	GitHubLogoIcon,
	PersonIcon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { CleanCodeCardContent } from "@/sections/services/_components/clean-code-card-content";
import {
	ConvertingCardContent,
	type ConvertingCardIconSet,
} from "@/sections/services/_components/converting-card-content";
import { ServicesCardContent } from "@/sections/services/_components/services-card-content";

export interface ServiceItem {
	name: string;
	description: string;
}

export interface ServiceFeature {
	name: string;
	description: string;
	href: string;
	className: string;
	background: ReactNode;
}

export const convertingCardIcons: ConvertingCardIconSet = {
	destination: {
		id: "client",
		Icon: PersonIcon,
	},
	hub: {
		id: "handoff",
		Icon: FigmaLogoIcon,
	},
	sources: [
		{
			id: "brief",
			Icon: FileTextIcon,
		},
		{
			id: "spec",
			Icon: FilePlusIcon,
		},
		{
			id: "assets",
			Icon: FileIcon,
		},
		{
			id: "repo",
			Icon: GitHubLogoIcon,
		},
	],
};

/** Seven principles from the Agile Manifesto, shown in the first service card animation. */
export const agileMethodologyPrinciples: ServiceItem[] = [
	{
		name: "Customer value first",
		description:
			"Our highest priority is to satisfy the customer through early and continuous delivery of valuable software.",
	},
	{
		name: "Welcome change",
		description:
			"Changing requirements late in development are harnessed for the customer's competitive advantage.",
	},
	{
		name: "Deliver working software frequently",
		description:
			"Ship on a short cadence—from weeks to months—with a bias toward the shortest cycle that still adds value.",
	},
	{
		name: "Business and developers together",
		description:
			"Product stakeholders and engineers collaborate daily so intent, tradeoffs, and priorities stay aligned.",
	},
	{
		name: "Motivated individuals",
		description:
			"Build around trusted people, give them the environment and support they need, and let them own the outcome.",
	},
	{
		name: "Working software measures progress",
		description:
			"Running, tested product—not documents alone—is the primary signal that you are moving the needle.",
	},
	{
		name: "Sustainable pace and technical excellence",
		description:
			"Maintain a steady rhythm indefinitely; continuous attention to good design and quality sustains agility.",
	},
];

export const bestPractices: ServiceItem[] = [
	{
		name: "Principle 01 — Lead With Outcomes",
		description:
			"A quick reminder to mention the measurable change you bring, not just the toolset you use to get there.",
	},
	{
		name: "Principle 02 — Keep Teams In The Loop",
		description:
			"Suggest how you handle weekly updates, async notes, or Loom recaps so clients know exactly what's moving.",
	},
	{
		name: "Principle 03 — Design For Handoff",
		description:
			"Explain how you package deliverables, documentation, or recordings so work is easy to extend later on.",
	},
	{
		name: "Principle 04 — Prototype Early",
		description:
			"Encourage readers to reference the prototypes, sandboxes, or experiments you typically run up front.",
	},
	{
		name: "Principle 05 — Sweat The Details",
		description:
			"Use this space to note your obsession with accessibility, polish, or animation that sets you apart.",
	},
	{
		name: "Principle 06 — Build For Change",
		description:
			"Remind teams that you keep architecture flexible, future-friendly, and ready for whatever V2 demands.",
	},
	{
		name: "Principle 07 — Document The Journey",
		description:
			"Point to how you capture learnings, write internal notes, or ship looms that demystify key decisions.",
	},
	{
		name: "Principle 08 — Test Relentlessly",
		description:
			"Reserve this bullet for your preferred QA cadence, tooling, or review rituals before anything ships.",
	},
	{
		name: "Principle 09 — Collaborate Openly",
		description:
			"Call out the cadence of workshops, office hours, or async standups you host with product partners.",
	},
	{
		name: "Principle 10 — Iterate After Launch",
		description:
			"Highlight how you stay close to analytics, user feedback, or retention data to plan the next release.",
	},
];

export const serviceFeatures: ServiceFeature[] = [
	{
		name: "Custom Software Solutions",
		description:
			"End-to-end web, mobile, and AI-powered solutions—discovery through implementation and release—shaped by agile delivery, clear ownership, and steady iteration.",
		href: "#",
		className: "col-span-1",
		background: <ServicesCardContent items={agileMethodologyPrinciples} />,
	},

	{
		name: "From Design To Build",
		description:
			"I turn briefs, specs, and design assets into clean, tested, and deployable software that your team can confidently extend.",
		href: "#",
		className: "col-span-1",
		background: <ConvertingCardContent icons={convertingCardIcons} />,
	},

	{
		name: "Code Standards",
		description:
			"Clean, maintainable code built with strict standards, clean architecture, code reviews, and automated testing — keeping your codebase scalable and easy to extend.",
		href: "#",
		className: "col-span-1",
		background: <CleanCodeCardContent items={bestPractices} />,
	},
];
