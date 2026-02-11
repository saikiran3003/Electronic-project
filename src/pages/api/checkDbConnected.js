import dbConnect from "@/lib/mongoose";
import mongoose from "mongoose";

export default async function handler(req, res) {
    try {
        await dbConnect();

        const db = mongoose.connection.db; // ✅ get native db
        const dbStatus = await db.command({ serverStatus: 1 });

        res.status(200).json({
            ok: true,
            message: "DB Connected, and status fetched successfully",
            // host: dbStatus.host,
            version: dbStatus.version,
            uptime: dbStatus.uptime,
            connections: dbStatus.connections,
            mem: dbStatus.mem,
        });
    } catch (error) {
        console.error("DB Status Error:", error);
        res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}