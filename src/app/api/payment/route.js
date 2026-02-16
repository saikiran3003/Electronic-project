import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";
import fs from "fs";
import path from "path";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        // Save to MongoDB
        const payment = await Payment.create({
            productName: body.productName,
            price: body.price,
            paymentMethod: body.paymentMethod,
            userToken: body.userToken,
            status: body.status,
            upiPin: body.upiPin,
        });

        // Save to Local JSON File
        const dbDir = path.join(process.cwd(), "db", "payment");
        const filePath = path.join(dbDir, "payments.json");

        // Ensure directory exists
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }

        const paymentData = {
            userId: body.email || body.userToken,
            fullName: body.fullName,
            productName: body.productName,
            productId: body.productId,
            price: body.price,
            paymentStatus: body.status || "Success",
            paymentDate: new Date().toISOString(),
        };

        let payments = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, "utf-8");
            payments = JSON.parse(fileData);
        }

        payments.push(paymentData);
        fs.writeFileSync(filePath, JSON.stringify(payments, null, 2));

        return Response.json({
            success: true,
            payment,
        });

    } catch (error) {
        return Response.json({
            success: false,
            error: error.message,
        });
    }
}
