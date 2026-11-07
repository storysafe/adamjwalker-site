import { defineMiddleware } from "astro:middleware";

/**
 * One canonical address: send www.adamjwalker.com and the workers.dev
 * address to adamjwalker.com, keeping the path and query (so old sign-in
 * links still work, just on the right domain).
 */
export const onRequest = defineMiddleware((context, next) => {
	const url = new URL(context.request.url);
	if (url.hostname === "www.adamjwalker.com" || url.hostname.endsWith(".workers.dev")) {
		url.protocol = "https:";
		url.hostname = "adamjwalker.com";
		url.port = "";
		return Response.redirect(url.toString(), 301);
	}
	return next();
});
