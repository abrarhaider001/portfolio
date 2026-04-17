import { GridIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { works } from "@/sections/works/_constants/works";
import WorksCard from "./_components/works-card";

export default function Works() {
	return (
		<Section
			id="works"
			title="Featured builds and products"
			description="Representative web product work—surfaces, flows, and full-stack delivery—showing how scoped features move from implementation to stable, shippable releases."
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
