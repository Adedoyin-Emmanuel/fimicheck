import { Update } from 'telegraf/types';
import { Context, Telegraf } from 'telegraf';

import { logger } from '../utils';

const handleRateLimit = async (error: any) => {
	if (error.code === 429) {
		const retryAfter = error.response.parameters.retry_after || 5;
		logger(`Rate limit hit! Retrying after ${retryAfter} seconds...`);
		await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
		return true;
	}
	return false;
};

const development = async (bot: Telegraf<Context<Update>>) => {
	try {
		console.log('Starting development');
		const botInfo = (await bot.telegram.getMe()).username;

		logger('Bot is running on dev mode');
		logger(`${botInfo} deleting webhook`);
		await bot.telegram.deleteWebhook();
		logger(`${botInfo} starting polling`);
		await bot.launch();

		process.once('SIGINT', () => bot.stop('SIGINT'));
		process.once('SIGTERM', () => bot.stop('SIGTERM'));
	} catch (error: any) {
		const shouldRetry = await handleRateLimit(error);
		if (shouldRetry) {
			logger('Retrying bot launch after rate limit...');
			await development(bot);
		} else {
			logger('Failed to start bot:', error);
		}
	}
};

export default development;
