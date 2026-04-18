import { createFileRoute } from "@tanstack/react-router";
import { GridIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import Footer from "@/sections/footer/footer";
import WorksProjectsClient from "@/sections/works/_components/works-projects-client";
import { siteMetadata } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
	head: () => ({
		meta: [
			{
				title: `Projects — ${siteMetadata.siteName}`,
			},
			{
				name: "description",
				content:
					"Full list of selected builds: web, mobile, AI, and automation work.",
			},
		],
	}),
	component: ProjectsPage,
});

function ProjectsPage() {
	return (
		<main className="mx-auto flex w-full flex-col items-stretch justify-start divide-y divide-border/80">
			<Section
				id="projects"
				title="All projects"
				description="Browse the complete set of builds and products—same detail as the home section, with pagination for longer lists."
				className="flex flex-col gap-4 pb-12"
				badgeText="Portfolio"
				badgeIcon={<GridIcon aria-hidden="true" className="size-3.5" />}
			>
				<WorksProjectsClient scrollAnchorId="projects" />
			</Section>
			<Footer />
		</main>
	);
}
