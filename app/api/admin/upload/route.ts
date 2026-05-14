export const dynamic = "force-dynamic";

import { v2 as cloudinary } from "cloudinary";
import { handleRouteError, AppError } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      throw new AppError("No file uploaded", 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "acm_website" },
        (error, result) => {
          if (error) reject(new AppError(error.message, 500));
          else resolve(result);
        }
      ).end(buffer);
    });

    return ok({ url: (result as any).secure_url }, "File uploaded successfully");
  } catch (err) {
    return handleRouteError(err);
  }
}
