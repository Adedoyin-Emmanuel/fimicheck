import { Context, Markup } from 'telegraf';

const about = () => async (ctx: Context) => {
	const botName = ctx.botInfo.username;
	const username = ctx.from?.username;
	const message = `Hi *${ctx.from?.first_name || ctx.from?.username}*! I'm *@${botName} 🎬*`;

	await ctx.replyWithMarkdown(message);
};

export { about };
