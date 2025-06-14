import { rateLimit } from "express-rate-limit";
import {
  GLOBAL_REQUEST_PER_MINUTE,
  GLOBAL_RATE_LIMIT_WINDOW_MS,
} from "../constants/app";

const defaultMessage = {
  code: 429,
  success: false,
  status: "Too many requests",
  message: "Too many requests, try again later",
  data: {},
};

export const useGolbalRateLimiter = rateLimit({
  windowMs: GLOBAL_RATE_LIMIT_WINDOW_MS,
  max: GLOBAL_REQUEST_PER_MINUTE,
  message: defaultMessage,
});
