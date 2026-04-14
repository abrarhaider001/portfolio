"use client";

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	allSkills,
	type SkillWithId,
} from "@/sections/skills/_constants/skills-data";

const CURSOR_CHIP_OFFSET = 14;
const PULSE_INTERVAL_MS = 2400;
const MOBILE_MAX_WIDTH = 767;

/** 2×2 from `md` up; always1×1 below `md`. */
const LARGE_TILE_IDS = new Set<string>([
	"full-stack-React",
	"full-stack-Node.js",
	"mobile-Flutter",
]);

function orderedSkillsForGrid(): SkillWithId[] {
	const featured = allSkills.filter((s) => LARGE_TILE_IDS.has(s.id));
	const rest = allSkills.filter((s) => !LARGE_TILE_IDS.has(s.id));
	const react = featured.find((s) => s.id === "full-stack-React");
	const node = featured.find((s) => s.id === "full-stack-Node.js");
	const flutter = featured.find((s) => s.id === "mobile-Flutter");
	const head = [react, node, flutter].filter(Boolean) as SkillWithId[];
	return [...head, ...rest];
}

function hexFromSkillClass(skill: SkillWithId): string | null {
	const c = skill.iconClassName;
	if (!c) {
		return null;
	}
	const m = c.match(/#([0-9A-Fa-f]{6})/);
	return m ? `#${m[1]}` : null;
}

/** RGB triple for rgba() — neutral slate when no brand hex (e.g. text-foreground). */
function brandRgbTriplet(skill: SkillWithId): string {
	const hex = hexFromSkillClass(skill);
	if (!hex) {
		return "148, 163, 184";
	}
	const h = hex.slice(1);
	return `${Number.parseInt(h.slice(0, 2), 16)}, ${Number.parseInt(h.slice(2, 4), 16)}, ${Number.parseInt(h.slice(4, 6), 16)}`;
}

function pickRandomPulseIndices(length: number): Set<number> {
	if (length <= 0) {
		return new Set();
	}
	if (length === 1) {
		return new Set([0]);
	}
	const a = Math.floor(Math.random() * length);
	let b = Math.floor(Math.random() * length);
	let guard = 0;
	while (b === a && guard < 50) {
		b = Math.floor(Math.random() * length);
		guard++;
	}
	if (b === a) {
		b = (a + 1) % length;
	}
	return new Set([a, b]);
}

function SkillCell({
	skill,
	isLarge,
	isPulseHighlight,
	onHoverStart,
	onHoverEnd,
}: {
	skill: SkillWithId;
	isLarge: boolean;
	isPulseHighlight: boolean;
	onHoverStart: () => void;
	onHoverEnd: () => void;
}) {
	const [hover, setHover] = useState(false);
	const [cursor, setCursor] = useState<{ x: number; y: number } | null>(
		null,
	);

	const onEnter = useCallback(
		(e: ReactMouseEvent<HTMLDivElement>) => {
			onHoverStart();
			setHover(true);
			setCursor({ x: e.clientX, y: e.clientY });
		},
		[onHoverStart],
	);

	const onMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
		setCursor({ x: e.clientX, y: e.clientY });
	}, []);

	const onLeave = useCallback(() => {
		onHoverEnd();
		setHover(false);
		setCursor(null);
	}, [onHoverEnd]);

	const rgb = brandRgbTriplet(skill);
	const accentActive = hover || isPulseHighlight;
	const mutedIcon = "text-foreground/70 dark:text-foreground/60";

	const chip =
		hover &&
		cursor &&
		typeof document !== "undefined" &&
		createPortal(
			<div
				className={cn(
					"pointer-events-none fixed z-[200] whitespace-nowrap rounded-full border border-border/55",
					"bg-popover px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm",
				)}
				style={{
					left: cursor.x + CURSOR_CHIP_OFFSET,
					top: cursor.y + CURSOR_CHIP_OFFSET,
				}}
				role="tooltip"
			>
				{skill.name}
			</div>,
			document.body,
		);

	return (
		<>
			<div
				aria-label={skill.name}
				onMouseEnter={onEnter}
				onMouseMove={onMove}
				onMouseLeave={onLeave}
				className={cn(
					"relative z-0 flex flex-col items-center justify-center overflow-visible rounded-xl text-center",
					"border border-border/45 bg-card/90",
					"shadow-[0_1px_2px_rgba(15,15,22,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)]",
					"col-span-1 row-span-1 min-h-[3.5rem] p-2 sm:min-h-[3.75rem] sm:p-2.5",
					isLarge &&
						"md:col-span-2 md:row-span-2 md:min-h-0 md:p-4 lg:p-5",
				)}
				style={
					accentActive
						? { borderColor: `rgba(${rgb}, 0.55)` }
						: undefined
				}
			>
				<div
					className={cn(
						"flex shrink-0 items-center justify-center rounded-lg bg-muted/45 dark:bg-muted/25",
						isLarge
							? "size-9 sm:size-10 md:size-12 lg:size-14"
							: "size-9 sm:size-10",
					)}
				>
					<skill.Icon
						className={cn(
							isLarge
								? "size-[1.15rem] sm:size-5 md:size-7 lg:size-8"
								: "size-[1.15rem] sm:size-5",
							accentActive && skill.iconClassName
								? skill.iconClassName
								: mutedIcon,
						)}
						aria-hidden
					/>
				</div>
			</div>
			{chip}
		</>
	);
}

export function SkillsGrid() {
	const skills = orderedSkillsForGrid();
	const [expanded, setExpanded] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [pulseIndices, setPulseIndices] = useState<Set<number>>(() =>
		pickRandomPulseIndices(orderedSkillsForGrid().length),
	);
	const [hoverCount, setHoverCount] = useState(0);
	const hoverCountRef = useRef(0);

	useEffect(() => {
		hoverCountRef.current = hoverCount;
	}, [hoverCount]);

	useEffect(() => {
		const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
		const upd = () => setIsMobile(mq.matches);
		upd();
		mq.addEventListener("change", upd);
		return () => mq.removeEventListener("change", upd);
	}, []);

	useEffect(() => {
		setPulseIndices(pickRandomPulseIndices(skills.length));
	}, [skills.length]);

	useEffect(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (reduce.matches) {
			return;
		}
		const t = window.setInterval(() => {
			if (hoverCountRef.current > 0) {
				return;
			}
			setPulseIndices(pickRandomPulseIndices(skills.length));
		}, PULSE_INTERVAL_MS);
		return () => window.clearInterval(t);
	}, [skills.length]);

	const onHoverStart = useCallback(() => {
		setHoverCount((c) => c + 1);
	}, []);

	const onHoverEnd = useCallback(() => {
		setHoverCount((c) => Math.max(0, c - 1));
	}, []);

	const pulseVisible = hoverCount === 0;

	return (
		<div
			className={cn(
				"overflow-visible rounded-[1.75rem] border border-border/50",
				"bg-muted/25 dark:bg-muted/15",
				"p-4 sm:p-5 md:p-6",
				"shadow-[0_1px_3px_rgba(15,15,22,0.05)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.25)]",
			)}
		>
			<div
				className={cn(
					"relative",
					isMobile && !expanded &&
						"max-h-[min(52vh,26rem)] overflow-hidden rounded-xl",
				)}
			>
				<div
					className={cn(
						"grid grid-flow-dense gap-1.5 sm:gap-2",
						"auto-rows-[3.5rem] sm:auto-rows-[3.75rem]",
						"grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7",
					)}
				>
					{skills.map((skill, index) => (
						<SkillCell
							key={skill.id}
							skill={skill}
							isLarge={LARGE_TILE_IDS.has(skill.id)}
							isPulseHighlight={
								pulseVisible && pulseIndices.has(index)
							}
							onHoverStart={onHoverStart}
							onHoverEnd={onHoverEnd}
						/>
					))}
				</div>
				{isMobile && !expanded ? (
					<div
						className={cn(
							"pointer-events-none absolute inset-x-0 bottom-0 h-20",
							"bg-linear-to-t from-muted/95 via-muted/40 to-transparent",
							"dark:from-muted/80 dark:via-muted/35",
						)}
						aria-hidden
					/>
				) : null}
			</div>
			{isMobile ? (
				<Button
					type="button"
					variant="secondary"
					className="mt-4 w-full sm:w-auto"
					onClick={() => setExpanded((e) => !e)}
				>
					{expanded ? "View less" : "View more"}
				</Button>
			) : null}
		</div>
	);
}
