import { BackpackIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { SkillsGrid } from "@/sections/skills/_components/skills-grid";

export default function Showcase() {
	return (
		<Section
			id="skills"
			title="Skills & Tech Stack"
			description="Tools, frameworks, and languages I use across full stack, mobile, and AI — compact grid with featured highlights."
			className="py-0 pb-6 md:pb-8"
			badgeText="Skills"
			badgeIcon={<BackpackIcon aria-hidden="true" className="size-3.5" />}
		>
			<SkillsGrid />
		</Section>
	);
}
