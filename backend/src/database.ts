import mongoose from "mongoose";




const connectDb = async () =>{
    const connectionString = `${process.env.DATABASE_STRING}`
   //  console.log(connectionString)
     try {
        const dbcon = await mongoose.connect(connectionString)
        console.log(" [DATABASE] CONNECTED TO DATABASE");
        // console.log(dbcon);
     } catch (error) {
        console.log(error);
        process.exit()
     }
}

export default connectDb 