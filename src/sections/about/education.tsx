import { ReaderIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import Section from "@/components/layout/section";

const coreCourses = [
	{ code: "PF", name: "Programming Fundamentals" },
	{ code: "OOP", name: "Object-Oriented Programming" },
	{ code: "DSA", name: "Data Structures & Algorithms" },
	{ code: "OS", name: "Operating Systems" },
	{ code: "DBMS", name: "Database Management Systems" },
	{ code: "CN", name: "Computer Networks" },
	{ code: "COAL", name: "Computer Organization & Assembly Language" },
	{ code: "TOC", name: "Theory of Computation" },
	{ code: "SE", name: "Software Engineering" },
	{ code: "CC", name: "Compiler Construction" },
	{ code: "AI", name: "Artificial Intelligence" },
	{ code: "DLD", name: "Digital Logic Design" },
	{ code: "Discrete", name: "Discrete Structures" },
	{ code: "LA", name: "Linear Algebra" },
	{ code: "Calculus", name: "Calculus & analytical methods" },
	{ code: "Prob & Stats", name: "Probability & Statistics" },
	{ code: "Web", name: "Web Engineering" },
	{ code: "CA", name: "Computer Architecture" },
] as const;

export default function Education() {
	return (
		<Section
			id="education"
			title="Education"
			description="My undergraduate work at UET Lahore grounds me in computer science fundamentals—algorithms, systems, and software engineering practice—so I can reason about real products, not only frameworks. The program pushes disciplined problem solving and clear communication, both of which carry directly into how I design features, review code, and collaborate with teams today."
			descriptionClassName="md:max-w-3xl"
			className="flex flex-col gap-8"
			badgeText="Education"
			badgeIcon={<ReaderIcon aria-hidden="true" className="size-3.5" />}
		>
			<div className="flex w-full flex-col gap-8">
				<div className="flex w-full min-w-0 flex-row items-start gap-4 sm:gap-6 md:gap-10">
					<div className="flex min-w-0 flex-1 flex-col gap-2 border-border/60 border-l-2 pl-5">
						<p className="text-lg font-medium text-balance text-foreground md:text-xl">
							Bachelor of Science in Computer Science
						</p>
						<p className="text-sm font-medium text-foreground/60 md:text-base">
							Dec 2022 – Present
						</p>
						<p className="text-sm font-medium text-foreground/80 md:text-base">
							University of Engineering and Technology, Lahore
						</p>
					</div>
					<div className="ml-auto shrink-0 self-start">
						<img
							src="/uet-lahore-logo-removebg.png"
							alt="University of Engineering and Technology, Lahore logo"
							width={200}
							height={200}
							className="h-20 w-auto max-w-[42vw] object-contain sm:h-24 sm:max-w-none md:h-28 lg:h-32"
							decoding="async"
						/>
					</div>
				</div>

				<div className="flex max-w-3xl flex-col gap-3">
					<p className="text-xs font-medium tracking-wide text-foreground/50 uppercase">
						Core coursework
					</p>
					<div className="flex flex-wrap gap-1.5">
						{coreCourses.map((course) => (
							<Badge
								key={course.code}
								variant="secondary"
								size="sm"
								className="max-w-[min(100%,16rem)] items-start whitespace-normal text-left text-[0.65rem] leading-snug font-medium normal-case md:text-[0.7rem]"
							>
								<span className="text-foreground/65">{course.name}</span>
							</Badge>
						))}
					</div>
				</div>

				<div className="max-w-3xl space-y-4 text-base font-medium leading-relaxed text-foreground/70 md:text-lg">
					<p>
						My coursework blends theory with applied software engineering—from
						data structures and discrete mathematics to databases, operating
						systems, and object-oriented design. I treat lectures and assignments
						as training for how production systems behave under constraints:
						memory, time complexity, concurrency, and maintainability—not as
						isolated exercises.
					</p>
					<p>
						Labs and group coursework mirror how teams ship: breaking problems into
						milestones, integrating components, debugging across layers, and
						presenting trade-offs clearly. That rhythm shaped how I approach Flutter
						and web work today: start from requirements, keep architecture explicit,
						and leave code that the next person can extend without guessing intent.
					</p>
					<p>
						Outside formal courses, I deepen topics that map to industry
						work—networking, API design, version control discipline, and performance
						profiling—so what I learn in class stays tied to shipping usable
						software, not only passing exams.
					</p>
				</div>
			</div>
		</Section>
	);
}
