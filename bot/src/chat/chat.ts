import { Context } from 'telegraf';
import { logger, sendTgMessage } from '../utils';

const chat = () => async (ctx: Context) => {
	logger('Fired "chat" text command');

	//@ts-ignore
	const message = ctx.message?.text as string;

	await sendTgMessage(ctx, `You typed: "${message}"`, true, 'MarkdownV2');
};

export { chat };
