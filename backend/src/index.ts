import app from "./app.js";



const port = process.env.SERVER_PORT || 9000; 


app.listen(port, () => { 

    console.log("Server started on Port")
})