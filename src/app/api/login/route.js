import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    return Response.json(
      {
        message: "Login successful",
        name: user.name || "",
        email: user.email || ""
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
