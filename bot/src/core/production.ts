import { config } from 'dotenv';
import { Update } from 'telegraf/types';
import { Context, Telegraf } from 'telegraf';

import { logger } from '../utils';
import { WORKER_URL } from '../constants';

config();

const production = async (req: Request, bot: Telegraf<Context<Update>>) => {
	try {
		logger('Bot running in production mode');

		const getWebhookInfo = await bot.telegram.getWebhookInfo();
		if (getWebhookInfo.url !== WORKER_URL) {
			logger(`deleting webhook ${WORKER_URL}`);
			await bot.telegram.deleteWebhook();
			logger(`setting webhook: ${WORKER_URL}`);
			await bot.telegram.setWebhook(`${WORKER_URL}`);
		}

		if (req.method === 'POST') {
			const body = await req.json();
			await bot.handleUpdate(body as unknown as Update);
			return new Response('Bot update handled successfully', {
				status: 200,
			});
		}

		return new Response('Bot running in production mode', {
			status: 200,
		});
	} catch (error: any) {
		logger(error);
		return new Response('Oh sugar. An error occured', {
			status: 500,
		});
	}
};

export default production;
