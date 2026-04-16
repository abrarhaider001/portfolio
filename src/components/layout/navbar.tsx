import { useGSAP } from "@gsap/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { LogoIcon } from "@/components/icons/logo-icon";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
	gsap,
	premiumEase,
	registerGsapPlugins,
	ScrollTrigger,
} from "@/lib/gsap-config";
import { useLenis } from "@/lib/lenis-context";
import { cn } from "@/lib/utils";

registerGsapPlugins();

type NavLinkItem = { kind: "link"; label: string; target: string };
type NavAboutItem = { kind: "about" };
type NavItem = NavLinkItem | NavAboutItem;

const NAV_ITEMS: NavItem[] = [
	{ kind: "link", label: "Services", target: "#services" },
	{ kind: "link", label: "Works", target: "#works" },
	{ kind: "about" },
	{ kind: "link", label: "Skills", target: "#skills" },
	{ kind: "link", label: "Testimonials", target: "#testimonials" },
	{ kind: "link", label: "FAQ", target: "#faq" },
	{ kind: "link", label: "Blog", target: "#blog" },
];

const colorWithOpacity = (token: string, opacity: number) => {
	const clamped = Math.min(Math.max(opacity, 0), 1);
	const percent = Number((clamped * 100).toFixed(2));
	return `color-mix(in oklab, var(${token}) ${percent}%, transparent)`;
};

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(
		typeof window !== "undefined" ? window.innerWidth < 1024 : false,
	);
	const [isNavbarElevated, setIsNavbarElevated] = useState(false);
	const navbarRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const menuContentRef = useRef<HTMLDivElement>(null);
	const toggleButtonRef = useRef<HTMLButtonElement>(null);
	const lineOneRef = useRef<HTMLSpanElement>(null);
	const lineTwoRef = useRef<HTMLSpanElement>(null);
	const lineThreeRef = useRef<HTMLSpanElement>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
	const desktopAboutPanelRef = useRef<HTMLDivElement>(null);
	const desktopAboutTl = useRef<gsap.core.Timeline | null>(null);
	const mobileAboutSubmenuRef = useRef<HTMLDivElement>(null);
	const { scrollTo } = useLenis();
	const mobileMenuId = useId();
	const aboutSubmenuId = useId();
	const [aboutSubmenuOpen, setAboutSubmenuOpen] = useState(false);

	const toggleTl = useRef<gsap.core.Timeline | null>(null);
	const menuTl = useRef<gsap.core.Timeline | null>(null);
	const navbarTl = useRef<gsap.core.Timeline | null>(null);

	useEffect(() => {
		const updateViewport = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		updateViewport();
		window.addEventListener("resize", updateViewport);

		return () => {
			window.removeEventListener("resize", updateViewport);
		};
	}, []);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
			if (!mobileMenuOpen || !menuRef.current || !toggleButtonRef.current) {
				return;
			}

			const target = event.target as Node;
			if (
				!menuRef.current.contains(target) &&
				!toggleButtonRef.current.contains(target)
			) {
				setMobileMenuOpen(false);
			}
		};

		document.addEventListener("click", handleOutsideClick);
		document.addEventListener("touchend", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
			document.removeEventListener("touchend", handleOutsideClick);
		};
	}, [mobileMenuOpen]);

	useGSAP(
		() => {
			const lineOne = lineOneRef.current;
			const lineTwo = lineTwoRef.current;
			const lineThree = lineThreeRef.current;
			if (!lineOne || !lineTwo || !lineThree) return;

			const tl = gsap.timeline({
				paused: true,
				defaults: {
					duration: 0.25,
					ease: premiumEase,
				},
			});

			tl.to(lineOne, { rotation: 45, y: 0 }, 0)
				.to(lineTwo, { opacity: 0, rotation: 45 }, 0)
				.to(lineThree, { rotation: -45, y: 0 }, 0);

			toggleTl.current = tl;

			return () => {
				tl.kill();
			};
		},
		{ scope: toggleButtonRef },
	);

	useGSAP(
		() => {
			const menu = menuContentRef.current;
			if (!menu) return;

			gsap.set(menu, {
				autoAlpha: 0,
				scale: 0.97,
				backdropFilter: "blur(0px)",
				borderColor: colorWithOpacity("--color-border", 0),
			});

			const tl = gsap.timeline({
				paused: true,
				defaults: {
					duration: 0.25,
					ease: premiumEase,
				},
			});

			tl.to(menu, {
				autoAlpha: 1,
				scale: 1,
				backdropFilter: "blur(16px)",
				borderColor: colorWithOpacity("--color-border", 1),
				onStart: () => {
					menu.style.display = "flex";
				},
			});

			menuTl.current = tl;

			return () => {
				tl.kill();
			};
		},
		{ scope: menuContentRef },
	);

	useGSAP(
		() => {
			const panel = desktopAboutPanelRef.current;
			if (!panel) return;

			gsap.set(panel, { autoAlpha: 0, y: -10 });
			const tl = gsap.timeline({
				paused: true,
				defaults: {
					duration: 0.22,
					ease: premiumEase,
				},
			});

			tl.to(panel, { autoAlpha: 1, y: 0 });

			desktopAboutTl.current = tl;

			return () => {
				tl.kill();
				desktopAboutTl.current = null;
			};
		},
		{ scope: desktopAboutPanelRef },
	);

	useEffect(() => {
		const iconTl = toggleTl.current;
		const mTl = menuTl.current;

		if (mobileMenuOpen) {
			iconTl?.play();
			mTl?.play();
		} else {
			iconTl?.reverse();
			mTl?.reverse();
		}
	}, [mobileMenuOpen]);

	useEffect(() => {
		if (!mobileMenuOpen) {
			setAboutSubmenuOpen(false);
		}
	}, [mobileMenuOpen]);

	useEffect(() => {
		const el = mobileAboutSubmenuRef.current;
		if (!el) return;

		gsap.killTweensOf(el);

		if (!mobileMenuOpen) {
			gsap.set(el, { height: 0 });
			return;
		}

		gsap.to(el, {
			height: aboutSubmenuOpen ? "auto" : 0,
			duration: 0.28,
			ease: premiumEase,
		});
	}, [aboutSubmenuOpen, mobileMenuOpen]);

	useGSAP(
		() => {
			const navbar = navbarRef.current;
			if (!navbar) return;

			scrollTriggerRef.current?.kill();
			scrollTriggerRef.current = null;
			navbarTl.current?.kill();
			navbarTl.current = null;

			if (isMobile) {
				setIsNavbarElevated(true);
				gsap.set(navbar, {
					backgroundColor: colorWithOpacity("--color-card", 0.75),
					borderColor: colorWithOpacity("--color-border", 1),
					backdropFilter: "blur(16px)",
					maxWidth: "100%",
					transform: "translateY(0px)",
					"--highlight-opacity": 1,
				});
				return;
			}

			setIsNavbarElevated(false);
			gsap.set(navbar, {
				backgroundColor: colorWithOpacity("--color-card", 0),
				borderColor: colorWithOpacity("--color-border", 0),
				backdropFilter: "blur(0px)",
				maxWidth: "66rem",
				transform: "translateY(0px)",
				"--highlight-opacity": 0,
			});

			const tl = gsap.timeline({
				paused: true,
				defaults: {
					duration: 0.35,
					ease: premiumEase,
				},
			});

			tl.to(navbar, {
				backgroundColor: colorWithOpacity("--color-card", 0.75),
				borderColor: colorWithOpacity("--color-border", 1),
				backdropFilter: "blur(16px)",
				maxWidth: "64rem",
				transform: "translateY(6px)",
				"--highlight-opacity": 1,
			});

			navbarTl.current = tl;

			scrollTriggerRef.current = ScrollTrigger.create({
				start: "top+=12 top",
				onEnter: () => {
					setIsNavbarElevated(true);
					navbarTl.current?.play();
				},
				onLeaveBack: () => {
					setIsNavbarElevated(false);
					navbarTl.current?.reverse();
				},
			});

			return () => {
				scrollTriggerRef.current?.kill();
				scrollTriggerRef.current = null;
				navbarTl.current?.kill();
				navbarTl.current = null;
			};
		},
		{ dependencies: [isMobile] },
	);

	useEffect(() => {
		return () => {
			scrollTriggerRef.current?.kill();
			scrollTriggerRef.current = null;
		};
	}, []);

	const handleScroll = (target: string) => {
		setMobileMenuOpen(false);
		setAboutSubmenuOpen(false);
		desktopAboutTl.current?.reverse();
		scrollTo(target);
	};

	const closeAboutNav = () => {
		setMobileMenuOpen(false);
		setAboutSubmenuOpen(false);
		desktopAboutTl.current?.reverse();
	};

	return (
		<nav
			className="fixed top-2 inset-x-0 z-50 flex justify-center px-6 md:px-24 lg:px-32"
			aria-label="Main navigation"
		>
			<div
				ref={navbarRef}
				className={cn(
					"relative flex w-264 items-center justify-between rounded-lg py-1.5 px-4",
					"bg-card/75 lg:bg-card/0 border border-border lg:border-border/0 dark:card-highlight",
					"[--highlight-opacity:1] lg:[--highlight-opacity:0] text-foreground transition-shadow duration-350 ease-navbar",
					isNavbarElevated && "shadow-lg",
				)}
			>
				<Button
					variant="ghost"
					size="sm"
					className="p-0 text-sm font-medium text-foreground hover:bg-transparent"
					onClick={() => handleScroll("#hero")}
					role="menuitem"
				>
					<div className="flex items-center gap-2">
						<LogoIcon className="size-4" />
						<span>Abrar.</span>
					</div>
				</Button>

				<div
					className="hidden absolute left-1/2 -translate-x-1/2 md:flex items-center gap-2"
					role="menubar"
					aria-label="Desktop navigation"
				>
					{NAV_ITEMS.map((item) =>
						item.kind === "about" ? (
							<div
								key="about"
								className="relative"
								onMouseEnter={() => desktopAboutTl.current?.play()}
								onMouseLeave={() => desktopAboutTl.current?.reverse()}
							>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="gap-1 px-2 text-xs text-foreground/70 hover:bg-transparent hover:text-foreground"
									aria-haspopup="menu"
								>
									About
									<ChevronDownIcon
										aria-hidden="true"
										className="size-3 opacity-70"
									/>
								</Button>
								<div className="absolute top-full left-0 z-[60] pt-1.5">
									<div
										ref={desktopAboutPanelRef}
										role="menu"
										aria-label="About"
										className="min-w-[11rem] rounded-lg border border-border/80 bg-card/95 py-1 shadow-lg backdrop-blur-md"
										style={{ visibility: "hidden" }}
									>
										<Link
											to="/education"
											role="menuitem"
											className="flex h-9 w-full items-center rounded-none px-3 text-xs text-foreground/70 transition-[color,background-color] duration-100 ease-out-quad hover:bg-muted/50 hover:text-foreground"
											onClick={closeAboutNav}
										>
											Education
										</Link>
										<Link
											to="/experience"
											role="menuitem"
											className="flex h-9 w-full items-center rounded-none px-3 text-xs text-foreground/70 transition-[color,background-color] duration-100 ease-out-quad hover:bg-muted/50 hover:text-foreground"
											onClick={closeAboutNav}
										>
											Experience
										</Link>
									</div>
								</div>
							</div>
						) : (
							<Button
								key={item.target}
								variant="ghost"
								size="sm"
								className="text-xs text-foreground/70 hover:bg-transparent hover:text-foreground"
								onClick={() => handleScroll(item.target)}
								role="menuitem"
							>
								{item.label}
							</Button>
						),
					)}
				</div>

				<div className="hidden md:flex items-center gap-2">
					<ThemeToggle />

					<Button
						variant="default"
						size="sm"
						className="text-xs"
						onClick={() => handleScroll("#contact")}
						role="menuitem"
					>
						Contact
					</Button>
				</div>

				<div className="flex md:hidden items-center gap-2">
					<ThemeToggle />

					<Button
						variant="ghost"
						size="sm"
						ref={toggleButtonRef}
						onClick={() => setMobileMenuOpen((prev) => !prev)}
						className="relative flex size-8 items-center justify-center"
						aria-expanded={mobileMenuOpen}
						aria-haspopup="true"
						aria-controls={mobileMenuId}
						aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					>
						<span
							ref={lineOneRef}
							className="absolute h-0.5 w-6 rounded-full bg-current"
							style={{ transform: "translateY(-6px)" }}
						/>
						<span
							ref={lineTwoRef}
							className="absolute h-0.5 w-6 rounded-full bg-current"
						/>
						<span
							ref={lineThreeRef}
							className="absolute h-0.5 w-6 rounded-full bg-current"
							style={{ transform: "translateY(6px)" }}
						/>
					</Button>
				</div>
			</div>

			<div
				ref={menuRef}
				id={mobileMenuId}
				role="menu"
				aria-label="Mobile navigation"
				className={cn(
					"absolute top-full mt-2 w-full max-w-6xl px-2 lg:hidden",
					mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
				)}
				aria-hidden={!mobileMenuOpen}
			>
				<div
					ref={menuContentRef}
					className="rounded-lg border bg-card/75 p-4 shadow-lg flex flex-col gap-2 overflow-hidden"
					style={{ visibility: "hidden" }}
				>
					{NAV_ITEMS.map((item) =>
						item.kind === "about" ? (
							<div key="about" className="flex flex-col">
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="justify-between px-0 text-foreground/70 hover:text-foreground"
									aria-expanded={aboutSubmenuOpen}
									aria-controls={aboutSubmenuId}
									onClick={() => setAboutSubmenuOpen((open) => !open)}
								>
									About
									<ChevronDownIcon
										aria-hidden="true"
										className={cn(
											"size-4 shrink-0 opacity-70 transition-transform duration-200 ease-out",
											aboutSubmenuOpen && "rotate-180",
										)}
									/>
								</Button>
								<div
									id={aboutSubmenuId}
									ref={mobileAboutSubmenuRef}
									className="overflow-hidden"
									style={{ height: 0 }}
								>
									<div className="flex flex-col gap-1 border-border/60 border-l py-1 pl-3">
										<Link
											to="/education"
											className="inline-flex min-h-9 items-center rounded-md px-0 text-sm text-foreground/70 transition-[color,background-color] duration-100 ease-out-quad hover:bg-transparent hover:text-foreground"
											role="menuitem"
											onClick={closeAboutNav}
										>
											Education
										</Link>
										<Link
											to="/experience"
											className="inline-flex min-h-9 items-center rounded-md px-0 text-sm text-foreground/70 transition-[color,background-color] duration-100 ease-out-quad hover:bg-transparent hover:text-foreground"
											role="menuitem"
											onClick={closeAboutNav}
										>
											Experience
										</Link>
									</div>
								</div>
							</div>
						) : (
							<Button
								key={item.target}
								variant="ghost"
								size="sm"
								className="justify-start px-0 text-foreground/70 hover:text-foreground"
								onClick={() => handleScroll(item.target)}
								role="menuitem"
							>
								{item.label}
							</Button>
						),
					)}
					<Button
						variant="default"
						size="sm"
						className="mt-2 text-sm"
						onClick={() => handleScroll("#contact")}
						role="menuitem"
					>
						Contact
					</Button>
				</div>
			</div>
		</nav>
	);
}
