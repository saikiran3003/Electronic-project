import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();

        const { name, email, password } = await req.json();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const newUser = await User.create({
            name,
            email,
            password,
        });

        return Response.json(
            { message: "User created successfully", user: newUser },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup API Error:", error);
        return Response.json(
            { message: "Error creating user", error: error.message },
            { status: 500 }
        );
    }
}