import mongoose from "mongoose";
import { connect } from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI="mongodb+srv://priyam3801h:priyam123@cluster0.2in6jmv.mongodb.net/"

const connectDB = async () => {
    // console.log(typeof MONGODB_URI)
    console.log(MONGODB_URI)
    try {
        connect(MONGODB_URI).then(()=>console.log("connected successfully"))
        .catch((e)=>console.log(e.message))


        // if(mongoose.connection.readyState===0){
        //    const data  = await mongoose.connect(process.env.MONGODB_URI)
        //    return "connected successfully"
    } catch (error:any) {
        console.log(error.message)
    }
}

export default connectDB