import { createFileRoute } from "@tanstack/react-router";
import Experience from "@/sections/about/experience";
import Footer from "@/sections/footer/footer";

export const Route = createFileRoute("/experience")({
	component: ExperiencePage,
});

function ExperiencePage() {
	return (
		<>
			<main className="mx-auto flex w-full flex-col items-stretch justify-start divide-y divide-border/80 pt-24 pb-8 md:pt-28">
				<Experience />
			</main>
			<Footer />
		</>
	);
}
