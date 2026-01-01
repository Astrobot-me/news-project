import app from "./app.js";
import connectDb from "./database.js";
import dotenv from "dotenv";
import client from "./services/redis.js";


dotenv.config({ 
    path: "./.env" 
});


const PORT = process.env.SERVER_PORT || 9000; 



connectDb().then( async ()=>{


    //conecting to Redis Client
    await client.connect(); 

    app.listen(PORT,()=>{
        console.log(`App is Live on http://localhost:${PORT}`)
    })

    

}).catch((error : any)=>{
    console.log(error);
})

// app.listen(PORT, () => { 

//     console.log("Server started on Port")
// })