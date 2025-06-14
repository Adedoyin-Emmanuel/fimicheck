import { RateLimiter } from "../middlewares";
import { GLOBAL_RATE_LIMITER } from "../constants";

const rateLimiter = new RateLimiter(GLOBAL_RATE_LIMITER);

export default rateLimiter;
