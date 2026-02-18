
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
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

async function uploadFileToCloudinary(file, folder = "products") {
  ensureCloudinaryConfigured();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });

  return uploadResult.secure_url;
}

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const imageFiles = formData.getAll("images"); // Get all images

    if (!name || !price || imageFiles.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, price, or images)" },
        { status: 400 }
      );
    }

    const imageUrls = [];
    for (const file of imageFiles) {
      if (file && file instanceof File) {
        const url = await uploadFileToCloudinary(file);
        imageUrls.push(url);
      }
    }

    const product = await Product.create({
      name,
      price,
      description,
      image: imageUrls[0], // First image is main
      images: imageUrls,   // Store all in gallery
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await dbConnect();

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const { _id, name, price, description, images, image } = await req.json();

      if (!_id) {
        return NextResponse.json(
          { success: false, message: "Product ID is required" },
          { status: 400 }
        );
      }

      const updatePayload = { name, price, description };
      if (images) updatePayload.images = images;
      if (image) updatePayload.image = image;

      const updatedProduct = await Product.findByIdAndUpdate(
        _id,
        updatePayload,
        { new: true }
      );

      if (!updatedProduct) {
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, product: updatedProduct });
    }

    // Handle Multipart update
    const formData = await req.formData();
    const _id = formData.get("_id");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const existingImages = formData.getAll("existingImages"); // Get already present URLs
    const imageFiles = formData.getAll("images"); // Get new files

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const updatePayload = { name, price, description };

    // Merge Existing + New Uploads
    if (imageFiles.length > 0 || existingImages.length > 0) {
      const newUrls = [];
      for (const file of imageFiles) {
        if (file && file instanceof File) {
          const url = await uploadFileToCloudinary(file);
          newUrls.push(url);
        }
      }

      const allImages = [...existingImages, ...newUrls];

      if (allImages.length > 0) {
        updatePayload.image = allImages[0]; // First in sequence is main
        updatePayload.images = allImages;
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(_id, updatePayload, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
