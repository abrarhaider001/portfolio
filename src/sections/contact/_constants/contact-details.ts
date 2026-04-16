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
		lines: ["Lahore, Pakistan"],
		href: "https://maps.google.com/?q=Lahore+Pakistan",
		external: true,
	},
	{
		id: "phone",
		title: "Phone",
		lines: ["+92 301 0668945"],
		href: "tel:+923010668945",
	},
	{
		id: "email",
		title: "Email",
		lines: ["abrarhaider157@gmail.com"],
		href: "mailto:abrarhaider157@gmail.com",
	},
];
