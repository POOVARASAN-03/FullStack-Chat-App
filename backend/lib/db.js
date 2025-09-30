import mongoose from 'mongoose'

export const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.DB_URL);
        console.log(`MogoDB Conneted : ${conn.connection.host}`)
    } catch (error) {
        console.log("MongoDb Connection Error:",error);
    }
}