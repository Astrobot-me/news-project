import { createClient, type RedisClientType } from "redis";

const client = createClient({ 
    url: process.env.REDIS_STRING as string
})

client.on("connect", () =>{ 
    console.error("[REDIS CLIENT] : Connected Succesfully ")
})
client.on("ready", () =>{ 
    console.error("[REDIS CLIENT] : Ready to use")
})
client.on("error", (error) =>{ 
    console.error("[REDIS CLIENT] : Failed to Connect :", error)
})


export default client 