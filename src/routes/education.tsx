import { createFileRoute } from "@tanstack/react-router";
import Education from "@/sections/about/education";
import Footer from "@/sections/footer/footer";

export const Route = createFileRoute("/education")({
	component: EducationPage,
});

function EducationPage() {
	return (
		<>
			<main className="mx-auto flex w-full flex-col items-stretch justify-start divide-y divide-border/80 pt-24 pb-8 md:pt-28">
				<Education />
			</main>
			<Footer />
		</>
	);
}
