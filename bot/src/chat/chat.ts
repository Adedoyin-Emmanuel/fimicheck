import { Context } from 'telegraf';
import { Message } from 'telegraf/types';

import { logger } from '../utils';
import Axios from '../config/axios';

const chat = () => async (ctx: Context) => {
	logger('Fired "chat" text command');

	if (!ctx.chat || !ctx.message) {
		return;
	}

	if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
		const message = ctx.message as Message.TextMessage;
		const messageEntities = message.entities || [];
		const isBotMentioned = messageEntities.some(
			(entity: { type: string; offset: number; length: number }) =>
				entity.type === 'mention' && message.text.substring(entity.offset, entity.offset + entity.length) === '@' + ctx.botInfo.username
		);

		if (!isBotMentioned) {
			return;
		}
	}

	const message = ctx.message as Message.TextMessage;
	const messageText = message.text;

	const cleanMessage = messageText.replace(`@${ctx.botInfo.username}`, '').trim();

	const plateNumber = cleanMessage.replace(/-/g, '');

	const loadingMsg = await ctx.sendMessage('🔍 Looking up plate number...');
	const loadingMsgId = loadingMsg.message_id;

	try {
		const response = await Axios.post('/lookup', {
			plateNumber,
		});

		const { data } = response.data;

		await ctx.telegram.editMessageText(
			ctx.chat.id,
			loadingMsgId,
			undefined,
			`🚗 *Vehicle Information*\n\n` + `Make: ${data.vehicleInfo.make}\n` + `Color: ${data.vehicleInfo.color}`,
			{ parse_mode: 'Markdown' }
		);

		const imageLoadingMsg = await ctx.sendMessage('🖼️ Loading possible vehicle images...');
		const imageLoadingMsgId = imageLoadingMsg.message_id;

		let imagesLoaded = false;
		try {
			const imagesToSend = data.images.slice(0, 5);
			for (const image of imagesToSend) {
				await ctx.telegram.sendPhoto(ctx.chat.id, image.url, {
					caption: image.title,
					parse_mode: 'Markdown',
				});
			}
			imagesLoaded = true;
		} catch (imageError) {
			logger('Error loading images:', imageError);
			await ctx.telegram.editMessageText(
				ctx.chat.id,
				imageLoadingMsgId,
				undefined,
				"❌ Some images failed to load, but here's what we found:"
			);
		}

		if (imagesLoaded) {
			await ctx.telegram.deleteMessage(ctx.chat.id, imageLoadingMsgId);
		}

		await ctx.telegram.sendMessage(
			ctx.chat.id,
			'🌟 *Enjoy using FimiCheck?*\n\n' +
				'Try our web app for a better experience:\n' +
				'https://fimicheck\\.adedoyin\\.dev\n\n' +
				'Star the project on GitHub:\n' +
				'https://github\\.com/adedoyin\\-emmanuel/fimicheck\n\n' +
				'Built by [Adedoyin Emmanuel](https://adedoyinemmanuel\\.dev)',
			{
				parse_mode: 'MarkdownV2',
				reply_markup: {
					inline_keyboard: [
						[
							{ text: '🌐 Try Web App', url: 'https://fimicheck.adedoyin.dev' },
							{ text: '⭐ Star on GitHub', url: 'https://github.com/adedoyin-emmanuel/fimicheck' },
						],
						[{ text: '👨‍💻 Find Me', url: 'https://adedoyinemmanuel.dev' }],
					],
				},
			}
		);
	} catch (error) {
		logger('Error in plate lookup:', error);
		await ctx.telegram.editMessageText(
			ctx.chat.id,
			loadingMsgId,
			undefined,
			'❌ Oh Sugar! Unable to retrieve information for the provided plate number. This may be due to an invalid or non-existent plate number. Please ensure you have entered a valid Nigerian vehicle registration number.'
		);
	}
};

export { chat };
