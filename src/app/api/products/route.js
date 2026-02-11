import dbConnect from "@/lib/mongodb";
import Product from "@/app/models/Product";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

let cloudinaryConfigured = false;

function getCloudinaryConfig() {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  return { cloudName, apiKey, apiSecret };
}

function ensureCloudinaryConfigured() {
  if (cloudinaryConfigured) return;

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env and restart the server."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  cloudinaryConfigured = true;
}

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    console.log("--- 🚀 PRODUCT UPLOAD START ---");

    // 1. Verify DB Connection
    await dbConnect();
    console.log("✅ 1. MongoDB connection verified");

    // 2. Receive Data
    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const imageFile = formData.get("image");

    console.log("📦 2. Data received:", { name, price, description, hasImage: !!imageFile });

    if (!name || !price || !imageFile) {
      throw new Error("Missing required fields (name, price, or image)");
    }

    // 3. Cloudinary Upload
    console.log("☁️ 3. Starting Cloudinary upload...");
    ensureCloudinaryConfigured();
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary Error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    console.log("✅ 3. Cloudinary success. URL:", uploadResult.secure_url);

    // 4. MongoDB Insert
    console.log("💾 4. Saving to MongoDB Atlas...");
    const product = await Product.create({
      name,
      price: parseFloat(price),
      description,
      image: uploadResult.secure_url,
    });

    console.log("✅ 4. MongoDB success! Product ID:", product._id);
    console.log("--- ✨ PRODUCT UPLOAD COMPLETE ---");

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      product
    });

  } catch (error) {
    console.error("❌ CRITICAL ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  try {
    await dbConnect();
    const { _id, name, price, description } = await req.json();

    if (!_id) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { name, price, description },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
