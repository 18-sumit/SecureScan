import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "../src/config/db.js"
dotenv.config({
    path: "/.env"
})

try {
    await connectDB();  // Wait for the DB connection to succeed
    app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at Port : ${process.env.PORT}`);
    });
} catch (err) {
    console.log("MONGODB CONNECTION FAILED !!", err);
}
