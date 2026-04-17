export interface WorksImageBackdrop {
	/**
	 * Main glow color (hex, hsl, oklch, etc.). Shown as a large blurred radial
	 * circle behind the gallery — edit this to change the mood per project.
	 */
	accent: string;
	/**
	 * Optional second tone for a slightly richer halo (defaults to a softer mix
	 * of `accent` when omitted).
	 */
	accentSoft?: string;
}

export interface WorksItem {
	/** Gallery images for this project (carousel when more than one) */
	images: string[];
	title: string;
	description: string;
	/** Tools & technologies shown as chips */
	technologies: string[];
	link: string;
	/** Soft blurred gradient orb behind the image frame (optional per project) */
	imageBackdrop?: WorksImageBackdrop;
}

export const works: WorksItem[] = [
	{
		images: [
			"/prodmaster/1.png",
			"/prodmaster/2.png",
			"/prodmaster/3.png",
		],
		title: "Project 1",
		description:
			"A concise summary of the problem, your role, and the outcome — swap this for a real case study when you ship.",
		technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
		link: "https://example.com/project-1",
		imageBackdrop: {
			accent: "#4f7cff",
			accentSoft: "#7c5cff",
		},
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
