import { useGSAP } from "@gsap/react";
import { FrameIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShinyBadge } from "@/components/ui/shiny-badge";
import {
	gsap,
	premiumEase,
	registerGsapPlugins,
	SplitText,
} from "@/lib/gsap-config";
import { useLenis } from "@/lib/lenis-context";
import { Background } from "@/sections/hero/_components/background";
import { HeroPortraitCard } from "@/sections/hero/_components/hero-portrait-card";
import { footerSocialLinks } from "@/sections/footer/_constants/footer";

registerGsapPlugins();

const instagramHref =
	footerSocialLinks.find((l) => l.label === "Instagram")?.href ??
	"https://www.instagram.com";
const linkedinHref =
	footerSocialLinks.find((l) => l.label === "LinkedIn")?.href ??
	"https://www.linkedin.com";
const githubHref =
	footerSocialLinks.find((l) => l.label === "GitHub")?.href ??
	"https://github.com";

export default function Hero() {
	const heroRef = useRef<HTMLDivElement>(null);
	const badgeRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descriptionRef = useRef<HTMLParagraphElement>(null);
	const actionsRef = useRef<HTMLDivElement>(null);
	const [fontsLoaded, setFontsLoaded] = useState(() => {
		if (typeof document === "undefined") {
			return false;
		}

		if (!("fonts" in document)) {
			return true;
		}

		return document.fonts.status === "loaded";
	});
	const { scrollTo } = useLenis();

	useEffect(() => {
		if (fontsLoaded || typeof document === "undefined") {
			return;
		}

		if (!("fonts" in document)) {
			setFontsLoaded(true);
			return;
		}

		let isActive = true;
		document.fonts.ready.then(() => {
			if (isActive) {
				setFontsLoaded(true);
			}
		});

		return () => {
			isActive = false;
		};
	}, [fontsLoaded]);

	useGSAP(
		(context) => {
			if (!fontsLoaded) {
				return;
			}

			const hero = heroRef.current;
			if (!hero) return;

			gsap.set(
				[
					badgeRef.current,
					titleRef.current,
					descriptionRef.current,
					actionsRef.current,
				],
				{ autoAlpha: 1 }
			);

			const splits: SplitText[] = [];
			context.add(() => {
				splits.forEach((split) => {
					split.revert();
				});
			});

			const titleSplit = titleRef.current
				? new SplitText(titleRef.current, { type: "lines" })
				: null;

			const descriptionSplit = descriptionRef.current
				? new SplitText(descriptionRef.current, { type: "lines" })
				: null;

			if (titleSplit) {
				splits.push(titleSplit);
			}
			if (descriptionSplit) {
				splits.push(descriptionSplit);
			}

			const timeline = gsap.timeline({
				defaults: {
					ease: premiumEase,
				},
				scrollTrigger: {
					trigger: hero,
					start: "top 80%",
					once: true,
				},
			});

			if (badgeRef.current) {
				timeline.from(badgeRef.current, {
					yPercent: 30,
					autoAlpha: 0,
					filter: "blur(16px)",
					duration: 0.55,
					ease: premiumEase,
				});
			}

			if (titleSplit) {
				timeline.from(
					titleSplit.lines,
					{
						yPercent: 30,
						autoAlpha: 0,
						filter: "blur(16px)",
						stagger: 0.1,
						duration: 0.55,
						ease: premiumEase,
					},
					"-=0.4",
				);
			}

			if (descriptionSplit) {
				timeline.from(
					descriptionSplit.lines,
					{
						yPercent: 30,
						autoAlpha: 0,
						filter: "blur(16px)",
						stagger: 0.1,
						duration: 0.55,
						ease: premiumEase,
					},
					"-=0.4",
				);
			}

			if (actionsRef.current) {
				const buttons = Array.from(
					actionsRef.current.children,
				) as HTMLElement[];
				timeline.fromTo(
					buttons,
					{
						yPercent: 30,
						autoAlpha: 0,
						filter: "blur(16px)",
						ease: premiumEase,
					},
					{
						yPercent: 0,
						autoAlpha: 1,
						filter: "blur(0px)",
						clearProps: "filter",
						stagger: 0.1,
						duration: 0.55,
						ease: premiumEase,
					},
					"-=0.4",
				);
			}

			// Note: previously we animated a right-side hero visualization here.
			// That section has been removed on request.

		},
		{
			scope: heroRef,
			dependencies: [fontsLoaded],
		},
	);

	return (
		<section
			id="hero"
			ref={heroRef}
			className="relative flex w-full flex-col px-6 md:px-24 lg:px-32"
		>
			<div className="relative z-10 mx-auto flex w-full max-w-[80rem] flex-1 flex-col items-center justify-start gap-8 pb-8 pt-24 md:gap-10 md:pt-28 lg:min-h-screen lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-12">
				<div className="flex w-full max-w-5xl flex-1 flex-col items-center gap-4 md:gap-6 lg:max-w-none lg:min-w-0 lg:flex-1 lg:items-start lg:justify-start lg:text-left xl:max-w-[52rem]">
					<div
						style={{ visibility: "hidden" }}
						ref={badgeRef}
						className="mx-auto w-fit lg:mx-0"
					>
						<ShinyBadge>
							<FrameIcon aria-hidden="true" className="size-3.5" />
							Full-Stack & AI Builder
						</ShinyBadge>
					</div>
					<h1
						style={{ visibility: "hidden" }}
						ref={titleRef}
						className="mb-3 md:mb-4 text-4xl md:text-6xl lg:text-7xl text-center text-foreground font-medium text-balance lg:text-left
             			max-w-[42rem] md:max-w-[46rem] lg:max-w-[52rem] xl:max-w-[60rem]"
					>
						Build. Scale. Evolve.
					</h1>
					<p
						style={{ visibility: "hidden" }}
						ref={descriptionRef}
						className="mx-auto max-w-xl text-balance text-center text-base font-medium leading-relaxed text-foreground/70 md:text-lg lg:mx-0 lg:text-left"
					>
						From web platforms to mobile apps and AI-powered systems — I design and develop end-to-end solutions that are fast, scalable, and user-focused. Every product is built with clean architecture and real-world performance in mind.
					</p>
					<div
						ref={actionsRef}
						className="mt-3 md:mt-4 relative z-10 flex items-center justify-center gap-2 md:gap-3 lg:justify-start"
					>
						<Button
							style={{ visibility: "hidden" }}
							variant="default"
							size="md"
							onClick={() => scrollTo("#contact")}
						>
							Start a Project
						</Button>
						<Button
							style={{ visibility: "hidden" }}
							variant="secondary"
							size="md"
							onClick={() => scrollTo("#works")}
						>
							View Portfolio
						</Button>
					</div>
				</div>

				<div className="hidden shrink-0 justify-center pt-6 lg:flex lg:w-auto lg:pt-0">
					<HeroPortraitCard
						imageSrc="/profile_rbg.png"
						imageWidth={434}
						imageHeight={574}
						imageAlt="Portrait"
						label="beyond tellerrand"
						githubHref={githubHref}
						instagramHref={instagramHref}
						linkedinHref={linkedinHref}
					/>
				</div>
			</div>

			<div className="pointer-events-none absolute inset-0 z-0 min-h-full w-full">
				<Background />
			</div>
		</section>
	);
}
