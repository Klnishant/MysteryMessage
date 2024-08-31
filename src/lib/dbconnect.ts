import { promises } from "dns";
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number;
}

const connection:ConnectionObject = {};

async function dbconnect(): Promise<void> {
    if(connection.isConnected){

        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "",{});

        connection.isConnected = db.connections[0].readyState;

    } catch (error) {
        console.error("Database connection failed");

        process.exit(1);
    }
}

export default dbconnect;