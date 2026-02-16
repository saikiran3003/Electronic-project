import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    paymentMethod: String,
    userToken: String,
    status: String,
    upiPin: String, // optional
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Payment ||
    mongoose.model("Payment", PaymentSchema);
