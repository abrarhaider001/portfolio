import { ReaderIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import Section from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import BlogCard from "@/sections/blog/_components/blog-card";
import type { PostMeta } from "@/sections/blog/_server/posts";

type BlogSectionProps = {
	posts: PostMeta[];
};

export default function Blog({ posts }: BlogSectionProps) {
	const hasPosts = posts && posts.length > 0;

	return (
		<Section
			id="blog"
			title="Problems, solutions, and notes from the field"
			description="Short articles on real software issues—debugging, architecture, APIs, and delivery—so you can see how I think before we work together."
			className="flex flex-col gap-6"
			badgeText="Latest posts"
			badgeIcon={<ReaderIcon aria-hidden="true" className="size-3.5" />}
		>
			{hasPosts ? (
				<>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{posts.map((post) => (
							<BlogCard key={post.slug} meta={post} />
						))}
					</div>
					<div className="flex justify-end pt-2">
						<Button variant="default" size="md" asChild>
							<Link to="/blog">View all posts</Link>
						</Button>
					</div>
				</>
			) : (
				<p className="text-sm text-foreground/60">
					No posts yet — add MDX files in{" "}
					<code className="rounded bg-muted px-1 py-0.5 text-xs">
						src/content/posts
					</code>{" "}
					(tag posts with <code className="rounded bg-muted px-1 py-0.5 text-xs">software-development</code>{" "}
					to prefer them in this preview).
				</p>
			)}
		</Section>
	);
}
