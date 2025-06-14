import { Context } from 'telegraf';

import { logger } from '../utils';
import { SAD_STICKER_FILE_ID } from '../constants';

export default function (error: unknown, ctx: Context) {
	try {
		ctx.replyWithSticker(SAD_STICKER_FILE_ID);
		ctx.reply(
			'Oh sugar 😞, an error occurred. Please try again later.'
		);
		console.log(error);
		logger(error);
	} catch (error: any) {
		console.log(error);
		logger(error);
	}
}
