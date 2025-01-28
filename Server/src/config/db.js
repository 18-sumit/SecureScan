import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";
import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config()

const connectDB = async () => {

    try {

        const mongoURI = `${process.env.MONGODB_URI}/${DB_NAME}`;

        const connectionInstance = await mongoose.connect(mongoURI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });

        console.log(`\n MONGODB connected with name : ${connectionInstance.connect.name}`)
    } catch (error) {
        console.log(`MONGODB connection failed due to ${error.message}`)
        process.exit(1);
    }
}

export default connectDB;
