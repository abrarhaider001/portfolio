export type ContactDetailItem = {
	id: string;
	title: string;
	lines: string[];
	href?: string;
	external?: boolean;
};

export const contactDetailItems: ContactDetailItem[] = [
	{
		id: "location",
		title: "Location",
		lines: ["Remote-first studio", "Chicago, IL · worldwide"],
		href: "https://maps.google.com/?q=Chicago+IL",
		external: true,
	},
	{
		id: "phone",
		title: "Phone",
		lines: ["+1 (555) 234-5678"],
		href: "tel:+15552345678",
	},
	{
		id: "email",
		title: "Email",
		lines: ["hello@example.com"],
		href: "mailto:hello@example.com",
	},
];
