import  mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const ConnectDB = async() => {
    try{
       mongoose.connect(process.env.MONGO_URL );
       console.log("MongoDB connected successfully");
    }catch(err){
        console.log("Error connecting to MongoDB:", err.message);
          process.exit(1);
    }
} 

export default ConnectDB;