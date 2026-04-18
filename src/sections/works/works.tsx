import { GridIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import WorksProjectsClient from "@/sections/works/_components/works-projects-client";
import { HOME_WORKS_PAGE_SIZE } from "@/sections/works/_constants/works";

export default function Works() {
	return (
		<Section
			id="works"
			title="Featured builds and products"
			description="Representative web product work—surfaces, flows, and full-stack delivery—showing how scoped features move from implementation to stable, shippable releases."
			className="flex flex-col gap-4"
			badgeText="Featured projects"
			badgeIcon={<GridIcon aria-hidden="true" className="size-3.5" />}
		>
			<WorksProjectsClient showViewAll pageSize={HOME_WORKS_PAGE_SIZE} />
		</Section>
	);
}
