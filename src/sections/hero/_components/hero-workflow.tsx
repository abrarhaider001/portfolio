"use client";

import { forwardRef, type ComponentPropsWithoutRef, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/sections/services/_components/converting-card-content";

type HeroWorkflowProps = ComponentPropsWithoutRef<"div">;

const glassNodeClass =
	"relative z-10 size-3.5 rounded-full border border-[#8FFFE8]/90 bg-[#00FFC2] shadow-[0_0_24px_rgba(0,255,194,0.75)]";

const glassBlockClass =
	"relative z-0 h-16 w-24 rounded-2xl border border-white/15 bg-[linear-gradient(155deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))] shadow-[0_20px_48px_-20px_rgba(0,255,194,0.45)] backdrop-blur-lg";

export const HeroWorkflow = forwardRef<HTMLDivElement, HeroWorkflowProps>(
	function HeroWorkflow({ className, ...props }, ref) {
		const containerRef = useRef<HTMLDivElement>(null);
		const originNodeRef = useRef<HTMLDivElement>(null);
		const buildNodeRef = useRef<HTMLDivElement>(null);
		const scaleNodeRef = useRef<HTMLDivElement>(null);
		const evolveNodeRef = useRef<HTMLDivElement>(null);
		const orbitNodeARef = useRef<HTMLDivElement>(null);
		const orbitNodeBRef = useRef<HTMLDivElement>(null);
		const orbitNodeCRef = useRef<HTMLDivElement>(null);

		const beamPairs = useMemo(
			() =>
				[
					{ from: originNodeRef, to: buildNodeRef, curvature: -16 },
					{ from: buildNodeRef, to: scaleNodeRef, curvature: -10 },
					{ from: scaleNodeRef, to: evolveNodeRef, curvature: 18 },
					{ from: buildNodeRef, to: orbitNodeARef, curvature: 20 },
					{ from: scaleNodeRef, to: orbitNodeBRef, curvature: 20 },
					{ from: evolveNodeRef, to: orbitNodeCRef, curvature: 28 },
				] as const,
			[],
		);

		return (
			<div
				ref={ref}
				className={cn("relative w-full max-w-xl justify-self-end", className)}
				{...props}
			>
				<div
					ref={containerRef}
					className="relative mx-auto h-[21rem] w-full min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#07090D] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_50px_90px_-50px_rgba(0,255,194,0.6)] lg:mx-0"
				>
					<div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#00FFC2]/15 blur-3xl" />
					<div className="pointer-events-none absolute -right-8 top-7 h-32 w-32 rounded-full bg-[#00FFC2]/20 blur-3xl" />
					<div className="absolute inset-x-10 bottom-8 h-8 rounded-[100%] bg-[#00FFC2]/10 blur-2xl" />

					<div className="relative grid h-full grid-cols-6 grid-rows-5">
						<div
							className={cn(
								glassBlockClass,
								"col-span-2 row-span-2 col-start-1 row-start-2 rotate-[-14deg]",
							)}
						/>
						<div
							className={cn(
								glassBlockClass,
								"col-span-2 row-span-2 col-start-3 row-start-2 rotate-[-8deg]",
							)}
						/>
						<div
							className={cn(
								glassBlockClass,
								"col-span-2 row-span-2 col-start-5 row-start-2 rotate-[-3deg]",
							)}
						/>

						<div
							ref={originNodeRef}
							className={cn(
								glassNodeClass,
								"col-start-1 row-start-3 ml-4 mt-2 animate-pulse",
							)}
							aria-label="Origin node"
						/>
						<div
							ref={buildNodeRef}
							className={cn(
								glassNodeClass,
								"col-start-3 row-start-3 ml-3 mt-1 animate-pulse",
							)}
							aria-label="Build node"
						/>
						<div
							ref={scaleNodeRef}
							className={cn(
								glassNodeClass,
								"col-start-4 row-start-3 ml-4 mt-2 animate-pulse",
							)}
							aria-label="Scale node"
						/>
						<div
							ref={evolveNodeRef}
							className={cn(
								glassNodeClass,
								"col-start-6 row-start-3 ml-2 mt-1 animate-pulse",
							)}
							aria-label="Evolve node"
						/>

						<div
							ref={orbitNodeARef}
							className={cn(glassNodeClass, "col-start-3 row-start-1 ml-8 mt-2")}
							aria-label="Orbit node A"
						/>
						<div
							ref={orbitNodeBRef}
							className={cn(glassNodeClass, "col-start-5 row-start-1 ml-4 mt-3")}
							aria-label="Orbit node B"
						/>
						<div
							ref={orbitNodeCRef}
							className={cn(glassNodeClass, "col-start-6 row-start-5 ml-2 mt-1")}
							aria-label="Orbit node C"
						/>

						<div className="pointer-events-none absolute inset-0 [background:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:34px_34px] opacity-30" />
						<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,255,194,0.18),transparent_50%),radial-gradient(circle_at_78%_20%,rgba(0,255,194,0.12),transparent_46%)]" />
					</div>

					{beamPairs.map(({ from, to, curvature }, i) => (
						<AnimatedBeam
							key={`hero-beam-${i}`}
							containerRef={containerRef}
							fromRef={from}
							toRef={to}
							curvature={curvature}
							delay={i * 0.16}
							pathColor="#00FFC2"
							pathOpacity={0.14}
							pathWidth={1.5}
							gradientStartColor="#B9FFEE"
							gradientStopColor="#00FFC2"
							duration={2.2}
						/>
					))}

					<div className="pointer-events-none absolute bottom-3 left-5 text-[0.65rem] uppercase tracking-[0.28em] text-[#A9FFF0]/70">
						Building • Scaling • Evolving
					</div>
				</div>
			</div>
		);
	},
);
