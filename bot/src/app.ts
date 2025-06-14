/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { bot } from './config';
import { chat } from './chat';
import { about, start } from './commands';
import { errorHandler } from './middlewares';
import { development, production } from './core';
import { ABOUT_COMMAND, START_COMMAND } from './constants';

bot.command(START_COMMAND, start());

bot.command(ABOUT_COMMAND, about());

bot.on('message', chat());

bot.catch(errorHandler);

export const startCloudflareWorker = async (request: Request) => {
	await production(request, bot);
};
