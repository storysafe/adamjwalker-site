import { defineMiddleware } from "astro:middleware";

/** Send www.adamjwalker.com to adamjwalker.com so there's one canonical address. */
export const onRequest = defineMiddleware((context, next) => {
	const url = new URL(context.request.url);
	if (url.hostname === "www.adamjwalker.com") {
		url.hostname = "adamjwalker.com";
		return Response.redirect(url.toString(), 301);
	}
	return next();
});
