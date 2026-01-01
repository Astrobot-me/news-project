import { rateLimit } from "express-rate-limit";
import RedisStore from "rate-limit-redis";
// import client, { connectRedis } from "./redis.js";

 
export const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	statusCode: 429,
	message: {
		error: "Error: Too Many Request! Rate Limit Exceeded",
	},
	// store: new RedisStore({
	// 	sendCommand: async (...args :string[]) => { 
			
	// 		await connectRedis();
			
	// 		return client.sendCommand(args);
	// 	},
	// }),
	// // skip: () => !client.isReady,
});

const authLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1    minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
});
