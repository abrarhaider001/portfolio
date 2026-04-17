import { GridIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { works } from "@/sections/works/_constants/works";
import WorksCard from "./_components/works-card";

export default function Works() {
	return (
		<Section
			id="works"
			title="Preview a few highlight projects"
			description="Swap in real case studies that show your range — from product builds to creative experiments."
			className="grid grid-cols-1 gap-4"
			badgeText="Featured projects"
			badgeIcon={<GridIcon aria-hidden="true" className="size-3.5" />}
		>
			{works.map((item) => (
				<WorksCard
					key={item.title}
					images={item.images}
					title={item.title}
					description={item.description}
					technologies={item.technologies}
					link={item.link}
					imageBackdrop={item.imageBackdrop}
				/>
			))}
		</Section>
	);
}
