import type { IconType } from "react-icons";
import {
	SiC,
	SiDart,
	SiDocker,
	SiExpress,
	SiFirebase,
	SiFlutter,
	SiGithub,
	SiGithubactions,
	SiHuggingface,
	SiJavascript,
	SiJira,
	SiJupyter,
	SiMongodb,
	SiMysql,
	SiNodedotjs,
	SiOpenai,
	SiPhp,
	SiPython,
	SiReact,
	SiZapier,
} from "react-icons/si";
import { LayersIcon } from "@radix-ui/react-icons";
import { PiCursorFill } from "react-icons/pi";
import type { ComponentType } from "react";
import { VscCode, VscVscode } from "react-icons/vsc";

export type SkillIcon = IconType | ComponentType<{ className?: string }>;

export type SkillEntry = {
	name: string;
	Icon: SkillIcon;
	iconClassName?: string;
};

/** Flat list for marquee / grids (stable id per category + name). */
export type SkillWithId = SkillEntry & { id: string };

export type SkillCategory = {
	id: string;
	title: string;
	description: string;
	skills: SkillEntry[];
};

export const skillCategories: SkillCategory[] = [
	{
		id: "full-stack",
		title: "Full Stack Development",
		description: "MERN stack — end-to-end web apps and APIs.",
		skills: [
			{ name: "MongoDB", Icon: SiMongodb, iconClassName: "text-[#47A248]" },
			{ name: "Express.js", Icon: SiExpress, iconClassName: "text-foreground" },
			{ name: "React", Icon: SiReact, iconClassName: "text-[#61DAFB]" },
			{ name: "Node.js", Icon: SiNodedotjs, iconClassName: "text-[#339933]" },
		],
	},
	{
		id: "mobile",
		title: "Mobile",
		description: "Cross-platform mobile experiences.",
		skills: [
			{
				name: "LLM Integration",
				Icon: SiOpenai,
				iconClassName: "text-foreground",
			},
			{ name: "Flutter", Icon: SiFlutter, iconClassName: "text-[#02569B]" },
			{ name: "Dart", Icon: SiDart, iconClassName: "text-[#0175C2]" },
			{
				name: "Cross-platform",
				Icon: LayersIcon,
				iconClassName: "text-foreground/80",
			},
		],
	},
	{
		id: "ai-ml",
		title: "AI & ML",
		description: "Applied AI and automation across the stack.",
		skills: [
			{
				name: "NLP",
				Icon: SiHuggingface,
				iconClassName: "text-[#FFD21E]",
			},
			{
				name: "AI Automation",
				Icon: SiZapier,
				iconClassName: "text-[#FF4A00]",
			},
		],
	},
	{
		id: "tools-databases",
		title: "Tools & Databases",
		description: "Dev workflow, infra, and data stores.",
		skills: [
			{ name: "GitHub", Icon: SiGithub, iconClassName: "text-foreground" },
			{ name: "Cursor", Icon: PiCursorFill, iconClassName: "text-foreground" },
			{
				name: "VS Code",
				Icon: VscVscode,
				iconClassName: "text-[#007ACC]",
			},
			{ name: "Jira", Icon: SiJira, iconClassName: "text-[#0052CC]" },
			{ name: "Jupyter", Icon: SiJupyter, iconClassName: "text-[#F37626]" },
			{ name: "Docker", Icon: SiDocker, iconClassName: "text-[#2496ED]" },
			{
				name: "CI/CD",
				Icon: SiGithubactions,
				iconClassName: "text-[#2088FF]",
			},
			{ name: "MySQL", Icon: SiMysql, iconClassName: "text-[#4479A1]" },
			{ name: "MongoDB", Icon: SiMongodb, iconClassName: "text-[#47A248]" },
			{ name: "Firebase", Icon: SiFirebase, iconClassName: "text-[#FFCA28]" },
		],
	},
	{
		id: "languages",
		title: "Languages",
		description: "Languages I use across systems and stacks.",
		skills: [
			{ name: "C", Icon: SiC, iconClassName: "text-[#A8B9CC]" },
			{ name: "C++", Icon: VscCode, iconClassName: "text-[#00599C]" },
			{
				name: "JavaScript",
				Icon: SiJavascript,
				iconClassName: "text-[#F7DF1E]",
			},
			{ name: "Python", Icon: SiPython, iconClassName: "text-[#3776AB]" },
			{ name: "Dart", Icon: SiDart, iconClassName: "text-[#0175C2]" },
			{ name: "PHP", Icon: SiPhp, iconClassName: "text-[#777BB4]" },
		],
	},
];

export const allSkills: SkillWithId[] = skillCategories.flatMap((category) =>
	category.skills.map((skill) => ({
		...skill,
		id: `${category.id}-${skill.name}`,
	})),
);
