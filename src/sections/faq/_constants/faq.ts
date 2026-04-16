export interface FaqItem {
	question: string;
	answer: string;
}

/** Client questions with first-person answers (you → the engineer). */
export const faqItems: FaqItem[] = [
	{
		question: "What kinds of software work do you take on?",
		answer:
			"I focus on full-stack product work: web apps and dashboards, REST and GraphQL APIs, databases, auth and payments, and integrations with tools you already use (CRM, analytics, email, and so on). I also help with cloud deploys, CI/CD, and performance tuning. If you tell me your goal and deadline, I will be honest about whether I am the right fit—or what I would need to say yes.",
	},
	{
		question: "How does a project usually start?",
		answer:
			"I start with a short discovery: who the users are, what “done” looks like, must-haves versus nice-to-haves, and any technical constraints. That is usually one or two calls plus a written summary. After that I send a proposed approach, rough milestones, and what I need from you (access, design, decisions) before I write a lot of production code. I do not like surprises mid-build, so I front-load clarity.",
	},
	{
		question: "How do we stay aligned while work is in progress?",
		answer:
			"I keep everything in a shared board or issue tracker so you always see what is in progress, blocked, or waiting on you. I send a concise written update on a cadence we agree on—often weekly—and I demo working software when it makes sense, not only at the end. If something changes priority, we reprioritize together and I call out schedule impact early.",
	},
	{
		question: "How long will my project take?",
		answer:
			"I give you a range based on scope and how fast we can get feedback—not a fake exact date. A tight MVP or single feature might be a few weeks; a larger product is often months. If requirements shift or approvals slow down, I will tell you how that affects the plan. I would rather reset expectations once than miss a deadline quietly.",
	},
	{
		question: "Who owns the code and intellectual property?",
		answer:
			"Once you have paid per our agreement, I hand you the repo, credentials, and documentation you need to run and extend the work. You own the custom deliverables we scoped unless we explicitly agreed otherwise (for example, my reuse of small internal utilities or open-source libraries under their licenses). I put IP, handover, and third-party licenses in writing before we start so there is no ambiguity.",
	},
	{
		question: "What happens after launch—support and changes?",
		answer:
			"I include a sensible handover: how to deploy, how to configure env vars, and where the important logic lives. I usually reserve a short window after go-live for critical fixes we agree count as launch defects. Anything new—features, refactors, SLAs—is scoped separately, either as a small follow-on project or a retainer if you want me on call. I will spell out what is in scope at launch versus what is new work.",
	},
	{
		question: "How do you handle quality, testing, and security?",
		answer:
			"I write automated tests where they pay off, exercise critical paths manually before release, and use code review or pairing when it helps. I keep secrets out of the repo, use staged environments where possible, and I am careful about access and data handling. I will not promise zero bugs—software does not work that way—but I will explain what I tested and what risk remains, especially if you handle regulated or sensitive data.",
	},
	{
		question: "How does pricing and contracting usually work?",
		answer:
			"I am comfortable with fixed price when the scope is clear enough to estimate, time-and-materials with a cap when exploration is part of the work, or a monthly retainer when you want ongoing capacity. I use a simple contract or statement of work: scope, milestones, payment schedule, change process, and what happens if we pause or stop. Ask me for a ballpark after discovery—I prefer quoting once I understand the problem, not from a one-line email.",
	},
];

export const faqItemsMobile: FaqItem[] = [
	{
		question: "What software work do you take on?",
		answer:
			"I build web apps, APIs, integrations, and cloud-backed features end-to-end. Tell me your goal—I will say if I am a fit or what I would need.",
	},
	{
		question: "How does a project start?",
		answer:
			"I run a short discovery, then share a plan and milestones before heavy development. I front-load decisions so we avoid mid-project surprises.",
	},
	{
		question: "How do we stay aligned?",
		answer:
			"I use a shared board, regular updates, and demos when useful. You always see what is blocked or waiting on you.",
	},
	{
		question: "How long will it take?",
		answer:
			"I quote ranges based on scope and feedback speed. Small work can be weeks; bigger products often months. I flag when scope changes move dates.",
	},
	{
		question: "Who owns the code?",
		answer:
			"You own what we agreed once paid—repo, docs, handover. I spell out IP and licenses in the contract before we start.",
	},
	{
		question: "What about after launch?",
		answer:
			"I hand over runbooks and access, and we agree a short post-launch fix window. New features or SLAs are scoped separately.",
	},
	{
		question: "Quality and security?",
		answer:
			"I test what matters, review critical code, and handle secrets and data carefully. I am upfront about risk—I do not promise zero bugs.",
	},
	{
		question: "Pricing and contracts?",
		answer:
			"I use fixed, T&M with a cap, or retainers depending on clarity. Everything goes in a written SOW: scope, payments, changes, and pause/exit.",
	},
];
