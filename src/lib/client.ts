import { treaty } from "@elysiajs/eden";
import type { App } from "../app/api/[[...slugs]]/route";

const apiOrigin =
	typeof window === "undefined" ? "http://localhost:3000" : window.location.origin;

export const client = treaty<App>(apiOrigin).api;
