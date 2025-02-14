import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";
import dotenv from "dotenv"
import logger from "../utils/logger.js";

// Load environment variables from .env file
dotenv.config()

const connectDB = async () => {

    try {

        const mongoURI = `${process.env.MONGODB_URI}/${DB_NAME}`;

        const connectionInstance = await mongoose.connect(mongoURI);

        logger.info(`\n MONGODB connected with HOST : ${connectionInstance.connection.host}`)
    } catch (error) {
        logger.error(`MONGODB connection failed due to ${error.message}`)
        process.exit(1);
    }
}

export default connectDB;
