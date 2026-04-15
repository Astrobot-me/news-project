import { createClient,  } from "redis";

const client = createClient({ 
    // url: process.env.REDIS_STRING as string
    url : process.env.REDIS_STRING_PROD as string

})

client.on("connect", () =>{ 
    console.log("[REDIS CLIENT] : Connected Succesfully ")
})
client.on("ready", () =>{ 
    console.log("[REDIS CLIENT] : Ready to use")
})
client.on("error", (error) =>{ 
    console.log("[REDIS CLIENT] : Failed to Connect :", error)
})

export async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}


export default client 