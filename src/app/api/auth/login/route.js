import clientPromise from "/lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();
  const client = await clientPromise;
  const db = client.db("mydb");

  const admin = await db.collection("admins").findOne({ email });

  if (!admin) return new Response(JSON.stringify({ message: "User not found" }), { status: 401 });

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });

  const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return new Response(JSON.stringify({ token }), { status: 200 });
}
