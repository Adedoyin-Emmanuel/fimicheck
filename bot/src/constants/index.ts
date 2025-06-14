import { config } from 'dotenv';

config();

export const WORKER_URL = '';
export const IS_PRODUCTION = false;
export const PRODUCTION_TOKEN = '';
export const START_COMMAND = 'start';
export const ABOUT_COMMAND = 'about';
export const DEVELOPMENT_TOKEN = '';
export const API_BASE_URL = 'http://localhost:2800/v1';
export const BOT_TOKEN = IS_PRODUCTION ? PRODUCTION_TOKEN : DEVELOPMENT_TOKEN; // change when working in development mode,
export const SAD_STICKER_FILE_ID = 'CAACAgIAAxkBAAOyZrmQLtyisEAca4s_9QK13vYp3aoAAvMAA1advQpqG-vEx_qW_jUE';
