import { createFileRoute } from "@tanstack/react-router";
import { ReaderIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import BlogCard from "@/sections/blog/_components/blog-card";
import Footer from "@/sections/footer/footer";
import { getAllPostsMeta } from "@/sections/blog/_server/posts";

export const Route = createFileRoute("/blog/")({
	loader: () => getAllPostsMeta(),
	component: BlogIndexPage,
});

function BlogIndexPage() {
	const posts = Route.useLoaderData();
	const hasPosts = posts.length > 0;

	return (
		<>
			<main className="mx-auto flex w-full max-w-[80rem] flex-col gap-10 px-6 py-16 md:px-24 lg:px-32">
				<Section
					title="Software development notes"
					description="Problems, trade-offs, and solutions from building real systems—longer reads than a tweet, shorter than a book."
					className="flex flex-col gap-6"
					badgeText="All posts"
					badgeIcon={<ReaderIcon aria-hidden="true" className="size-3.5" />}
				>
					{hasPosts ? (
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{posts.map((post) => (
								<BlogCard key={post.slug} meta={post} />
							))}
						</div>
					) : (
						<p className="text-sm text-foreground/60">
							No posts yet — add MDX files in{" "}
							<code className="rounded bg-muted px-1 py-0.5 text-xs">
								src/content/posts
							</code>
							.
						</p>
					)}
				</Section>
			</main>
			<Footer />
		</>
	);
}
