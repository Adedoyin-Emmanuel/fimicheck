import { startCloudflareWorker } from "./app";
import { development } from "./core";
import {bot} from "./config";
import { IS_PRODUCTION } from "./constants";

export default {
  async fetch(request: Request): Promise<Response> {
    try {

	if (!IS_PRODUCTION ) {
	   await development(bot);

		return new Response("Bot running in development mode", {
			status: 200,
		});
	}else{
		await startCloudflareWorker(request);
		return new Response("Bot running in production mode", {
			status: 200,
		});

	}

    } catch (e: any) {
      return new Response(
        `<h1>Server Error</h1><p>Sorry, there was a problem ${e.message}</p>`,
        {
          status: 500,
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
    }
  },
};
