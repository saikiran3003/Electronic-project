import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const test = await Product.create({
    name: "DB Test",
    price: 1,
    description: "Test",
    image: "/assets/images/tvimage.jpg",
  });

  return NextResponse.json(test);
}
