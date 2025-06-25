import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
