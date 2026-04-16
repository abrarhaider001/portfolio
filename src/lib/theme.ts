import { createServerFn } from "@tanstack/react-start";
import * as z from "zod";

const postThemeValidator = z.union([z.literal("light"), z.literal("dark")]);
export type T = z.infer<typeof postThemeValidator>;
const storageKey = "_preferred-theme";

const themeCookieOptions = {
	path: "/",
	maxAge: 60 * 60 * 24 * 365,
	sameSite: "lax" as const,
};

/**
 * Cookie helpers must load from `@tanstack/start-server-core` inside handlers.
 * A static import from `@tanstack/react-start/server` can be rewritten by Vite SSR
 * so `getCookie` is not a function at runtime.
 */
export const getThemeServerFn = createServerFn().handler(async () => {
	const { getCookie } = await import("@tanstack/start-server-core");
	const value = getCookie(storageKey);
	if (value === "dark" || value === "light") {
		return value;
	}
	return "light";
});

export const setThemeServerFn = createServerFn({ method: "POST" })
	.inputValidator(postThemeValidator)
	.handler(async ({ data }) => {
		const { setCookie } = await import("@tanstack/start-server-core");
		setCookie(storageKey, data, themeCookieOptions);
	});
