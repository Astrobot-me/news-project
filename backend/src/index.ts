import app from "./app.js";
import connectDb from "./database.js";



const PORT = process.env.SERVER_PORT || 9000; 


connectDb().then(()=>{

    app.listen(PORT,()=>{
        console.log(`App is Live on http://localhost:${PORT}`)
    })
    

}).catch((error : any)=>{
    console.log(error);
})

app.listen(PORT, () => { 

    console.log("Server started on Port")
})