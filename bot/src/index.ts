import { startCloudflareWorker } from "./app";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		try {
			await startCloudflareWorker(request, env);
			return new Response("Bot running in production mode", {
				status: 200,
			});
		} catch (e: any) {
			return new Response(`<h1>Server Error</h1><p>Sorry, there was a problem ${e.message}</p>`, {
				status: 500,
				headers: {
					"Content-Type": "text/html",
				},
			});
		}
	},
};
