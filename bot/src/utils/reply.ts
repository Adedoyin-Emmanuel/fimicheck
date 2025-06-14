import { Context } from 'telegraf';

import { rateLimiter } from '../config';

export const replyToMessage = (ctx: Context, messageId: number, string: string) => {
	ctx.reply(string, {
		reply_parameters: { message_id: messageId },
		parse_mode: 'MarkdownV2',
	});
};

function escapeMarkdownV2(text: string): string {
	return text.replace(/[._]/g, '\\$&');
}

export async function sendTgMessage(
	ctx: Context,
	message: string,
	shouldReply: boolean = true,
	parseMode: 'Markdown' | 'MarkdownV2' | 'HTML' = 'Markdown'
) {
	const chatId = ctx?.chat!.id as number;
	const messageId = ctx?.message!.message_id;

	if (message.length === 0) {
		throw new Error('Message cannot be empty');
	}

	const escapedMessage = escapeMarkdownV2(message);

	if (shouldReply) {
		await ctx.telegram.sendMessage(chatId, escapedMessage, {
			reply_markup: {
				selective: false,
				// @ts-ignore
				force_reply: false,
			},
			reply_parameters: {
				message_id: messageId,
				chat_id: chatId,
			},
			parse_mode: parseMode,
		});
	} else {
		rateLimiter.addToQueue('Send Telegram Message', async () => {
			await ctx.telegram.sendMessage(chatId, message);
		});
	}
}

export const sendLoadingMessage = async (ctx: Context, message: string = 'Loading ...') => {
	await ctx.sendMessage(`🔄 ${message}`);
};
