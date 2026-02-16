// import dbConnect from "@/lib/mongodb";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function POST(req) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return Response.json(
//         { message: "Email and password required" },
//         { status: 400 }
//       );
//     }

//     await dbConnect();
//     const db = mongoose.connection.db;

//     const user = await db.collection("users").findOne({ email });

//     if (!user) {
//       return Response.json(
//         { message: "User not found" },
//         { status: 401 }
//       );
//     }

//     const isValid = await bcrypt.compare(password, user.password);

//     if (!isValid) {
//       return Response.json(
//         { message: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     if (!process.env.JWT_SECRET) {
//       return Response.json(
//         { message: "JWT secret missing" },
//         { status: 500 }
//       );
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     return Response.json(
//       {
//         message: "Login Successful",
//         token,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return Response.json(
//       { message: "Internal server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json(
      { message: "Admin login successful" },
      { status: 200 }
    );

    // Set cookie that expires on browser/tab close (no maxAge or expires)
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


