export interface WorksItem {
	/** Gallery images for this project (carousel when more than one) */
	images: string[];
	title: string;
	description: string;
	/** Tools & technologies shown as chips */
	technologies: string[];
	link: string;
}

export const works: WorksItem[] = [
	{
		images: [
			"/placeholder-1.jpg",
			"/placeholder-1.jpg",
			"/placeholder-1.jpg",
		],
		title: "Project 1",
		description:
			"A concise summary of the problem, your role, and the outcome — swap this for a real case study when you ship.",
		technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
		link: "https://example.com/project-1",
	},
	{
		images: ["/placeholder-1.jpg"],
		title: "Project 2",
		description:
			"Second highlight: product work, creative build, or experiment — keep descriptions scannable and outcome-focused.",
		technologies: ["Next.js", "Tailwind CSS", "Vercel", "Prisma"],
		link: "https://example.com/project-2",
	},
];
