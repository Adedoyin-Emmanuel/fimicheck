import { Telegraf, Context } from "telegraf";

import { chat } from "./chat";
import { about, start } from "./commands";
import { errorHandler } from "./middlewares";
import { development, production } from "./core";
import { ABOUT_COMMAND, START_COMMAND } from "./constants";

export const startCloudflareWorker = async (request: Request, env: Env) => {
	const bot = new Telegraf<Context>(env.BOT_TOKEN);

	bot.command(START_COMMAND, start());
	bot.command(ABOUT_COMMAND, about());

	bot.on("message", chat());
	bot.catch(errorHandler);

	if (env.NODE_ENV === "development") {
		await development(bot);
	} else {
		await production(request, bot, env.WORKER_URL);
	}
};
