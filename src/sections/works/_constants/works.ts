export interface WorksImageBackdrop {
	accent: string;
	accentSoft?: string;
}

export interface WorksItem {
	id: string;
	images: string[];
	title: string;
	description: string;
	technologies: string[];
	link: string;
	imageBackdrop?: WorksImageBackdrop;
}

/** Page size for home `#works` and `/projects` lists. */
export const WORKS_PAGE_SIZE = 10;

const gallery = ["/prodmaster/1.png", "/prodmaster/2.png", "/prodmaster/3.png"] as const;

function galleryFor(index: number): string[] {
	const src = gallery[index % gallery.length];
	return [src];
}

export const works: WorksItem[] = [
	{
		id: "automated-hr-fyp",
		images: galleryFor(0),
		title: "Automated HR System (FYP)",
		description:
			"Developed a full-stack HR automation system handling payroll, attendance, and employee management. Implemented AI-based resume screening, candidate ranking, interview scheduling, and panel allocation.",
		technologies: ["Full-stack", "Payroll", "AI screening", "Scheduling"],
		link: "#",
		imageBackdrop: { accent: "#4f7cff", accentSoft: "#7c5cff" },
	},
	{
		id: "atares",
		images: galleryFor(1),
		title: "Atares — AI Readiness Analysis Platform",
		description:
			"Developed a web-based platform enabling companies to assess their AI readiness through structured questionnaires. Generated detailed analysis reports with insights across 7 key readiness pillars for strategic decision-making.",
		technologies: ["Web", "Questionnaires", "Reporting", "Analytics"],
		link: "https://atares.team",
		imageBackdrop: { accent: "#6366f1", accentSoft: "#8b5cf6" },
	},
	{
		id: "primechoice",
		images: galleryFor(2),
		title: "PrimeChoice",
		description:
			"Built a 3D wall scanning system to generate home blueprints. Automated cost estimation for paint based on scanned dimensions.",
		technologies: ["3D scanning", "Computer vision", "Estimation"],
		link: "#",
	},
	{
		id: "myparkingfines",
		images: galleryFor(3),
		title: "MyParkingFines",
		description:
			"Developed a Flutter app for managing and paying parking fines. Integrated OCR for automatic ticket scanning and processing.",
		technologies: ["Flutter", "OCR", "Payments"],
		link: "#",
	},
	{
		id: "equifeed",
		images: galleryFor(4),
		title: "EquiFeed",
		description:
			"Developed a horse feed estimation tool based on horse condition and nutritional requirements. Designed calculation logic to assist in optimized feeding plans.",
		technologies: ["Flutter", "Algorithms", "Nutrition"],
		link: "#",
	},
	{
		id: "sglapp",
		images: galleryFor(5),
		title: "Sglapp",
		description:
			"Built a competitive card collection app with card scanning features. Implemented in-app purchases and reward redemption system.",
		technologies: ["Flutter", "IAP", "Rewards", "ML Kit"],
		link: "#",
	},
	{
		id: "servicehub",
		images: galleryFor(6),
		title: "ServiceHub",
		description:
			"Developed an online platform for booking home services such as cleaning, gardening, electricians, and plumbing.",
		technologies: ["Web", "Booking", "Marketplace"],
		link: "#",
	},
	{
		id: "fithub",
		images: galleryFor(7),
		title: "FitHub",
		description:
			"Integrated an AI-powered health chatbot to provide personalized fitness and health-related guidance. Implemented image processing models to scan food images and estimate calorie intake automatically.",
		technologies: ["AI chatbot", "Image ML", "Health"],
		link: "#",
		imageBackdrop: { accent: "#22c55e", accentSoft: "#14b8a6" },
	},
	{
		id: "biometric-attendance",
		images: galleryFor(8),
		title: "Biometric Attendance App",
		description:
			"Designed a location-based biometric attendance system. Built role-based access for students, teachers, and administrators.",
		technologies: ["Flutter", "Biometrics", "Maps", "RBAC"],
		link: "#",
	},
	{
		id: "teravault",
		images: galleryFor(9),
		title: "Teravault",
		description:
			"Developed utility app to fetch file details from TeraBox URLs. Enabled secure file downloads using API integration.",
		technologies: ["Flutter", "REST APIs", "Downloads"],
		link: "#",
	},
	{
		id: "teachertrack",
		images: galleryFor(10),
		title: "TeacherTrack",
		description:
			"Built an online AI-assisted learning platform where educators assign modules, monitor learner progress, and spot gaps early. Combines structured lesson delivery with dashboards so follow-up stays fast, organized, and grounded in how students actually engage.",
		technologies: ["Web", "AI tutoring", "Progress tracking"],
		link: "#",
		imageBackdrop: { accent: "#0ea5e9", accentSoft: "#6366f1" },
	},
	{
		id: "shopbox",
		images: galleryFor(11),
		title: "ShopBox",
		description:
			"Delivered a full-featured ecommerce experience—catalog, cart, checkout, and order handling—with role-based access so admins, staff, and shoppers only see the actions and data their role should control.",
		technologies: ["Ecommerce", "RBAC", "Orders", "Catalog"],
		link: "#",
	},
	{
		id: "messmate",
		images: galleryFor(12),
		title: "MessMate",
		description:
			"Shipped a mess-management system for shared dining: meal plans, allotments or preferences, and clearer coordination between kitchen staff and residents—replacing ad-hoc messages and spreadsheets with a single dependable workflow.",
		technologies: ["Web / mobile", "Scheduling", "Notifications"],
		link: "#",
	},
];

/** Total projects in {@link works} — use as **X** in “Showing a to b of X results”. */
export const TOTAL_PROJECT_COUNT = works.length;

/** Page size for home `#works` (paginates the full list). `/projects` uses {@link WORKS_PAGE_SIZE}. */
export const HOME_WORKS_PAGE_SIZE = 4;
