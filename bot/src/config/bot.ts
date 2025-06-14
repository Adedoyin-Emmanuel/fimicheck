import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "../constants";
import { Context } from "telegraf";

const bot = new Telegraf<Context>(BOT_TOKEN);

export default bot;
