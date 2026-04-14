import { createFileRoute } from "@tanstack/react-router";
import { getAllPostsMeta } from "@/sections/blog/_server/posts";
import Blog from "@/sections/blog/blog";
import Contact from "@/sections/contact/contact";
import FAQ from "@/sections/faq/faq";
import Footer from "@/sections/footer/footer";
import Hero from "@/sections/hero/hero";
import Services from "@/sections/services/services";
import Showcase from "@/sections/showcase/showcase";
import Testimonials from "@/sections/testimonials/testimonials";
import Works from "@/sections/works/works";

export const Route = createFileRoute("/")({
	loader: () => getAllPostsMeta(),
	component: App,
});

function App() {
	const posts = Route.useLoaderData();
	return (
		<>
			<Hero />
			<main className="mx-auto flex w-full flex-col items-stretch justify-start divide-y divide-border/80">
				<Services />
				<Works />
				<Showcase />
				<Testimonials />
				<FAQ />
				<Blog posts={posts} />
				<Contact />
				<Footer />
			</main>
		</>
	);
}
