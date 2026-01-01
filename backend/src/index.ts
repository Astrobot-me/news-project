import app from "./app.js";
import connectDb from "./database.js";
import dotenv from "dotenv";
import { connectRedis } from "./services/redis.js";
// import client from "./services/redis.js";

dotenv.config({
	path: "./.env",
});

const PORT = process.env.SERVER_PORT || 9000;

async function startApplication() {
	try {
		console.log("[STARTING APPLICATION]");

		await connectDb();
        await connectRedis();

		app.listen(PORT, () => {
			console.log(`App is Live on http://localhost:${PORT}`);
		});

	} catch (error) {

        console.log(error);
    }
}

startApplication();

// connectDb()
// 	.then(async () => {
// 		console.log("[STARTING APPLICATION]");
// 		//conecting to Redis Client

// 		app.listen(PORT, () => {
// 			console.log(`App is Live on http://localhost:${PORT}`);
// 		});
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});
