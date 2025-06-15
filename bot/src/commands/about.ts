import { Context, Markup } from 'telegraf';

const about = () => async (ctx: Context) => {
	const botName = ctx.botInfo.username;
	const username = ctx.from?.username;
	const message = `Hi *${
		ctx.from?.first_name || ctx.from?.username
	}*! I'm *@${botName} 🎬*. I'm a bot that can help you lookup Nigerian vehicle information using plate numbers. To get started, just type the PLATE NUMBER without (-). Use the web app at https://fimicheck.adedoyin.dev`;

	await ctx.replyWithMarkdown(message);
};

export { about };
