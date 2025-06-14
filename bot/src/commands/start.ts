import { Context, Markup } from 'telegraf';

const start = () => async (ctx: Context) => {
	const botUsername = ctx.botInfo?.username;
	const shareUrl = `https://t.me/${botUsername}`;

	await ctx.replyWithMarkdown(
		`Hi, *${ctx.from?.first_name}*! I'm *@${botUsername} 🎬*. A Nigerian plate number lookup tool. Retrieve car info from Nigerian plate numbers`,
		Markup.inlineKeyboard([
			[
				Markup.button.url(
					'🤖 Share Nigerian Plate Number Lookup Bot ',
					`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
						'A Nigerian plate number lookup tool. Retrieve car info from Nigerian plate numbers!'
					)}`
				),
			],
		])
	);
};

export { start };
