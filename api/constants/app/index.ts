export const GLOBAL_RATE_LIMIT_WINDOW_MS = 60 * 1000;
export const GLOBAL_REQUEST_PER_MINUTE = 100;
export const ALLOWED_FILE_UPLOAD_EXTENSIONS = ["png", "jpeg", "jpg"];
export const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const MORGAN_CONFIG = IS_PRODUCTION
  ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
  : "dev";

export const PORT = process.env.PORT || 2800;