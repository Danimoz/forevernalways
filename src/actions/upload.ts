'use server'

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import WeddingPhoto from '@/lib/models'
import { revalidatePath } from "next/cache";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string, 
  api_key: process.env.CLOUDINARY_API_KEY as string, 
  api_secret: process.env.CLOUDINARY_API_SECRET as string,  
});

export async function uploadPhoto(_prevState: unknown, imageUrls: string[]) {
  try {
    if (imageUrls.length === 0) {
      return { message: "No image to upload!", status: 400 };
    }

    for (const imageUrl of imageUrls) {
      const upload: UploadApiResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imageUrl, { folder: 'marisem' }, (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error('No result from Cloudinary'));
        });
      });
    
      const image = upload.secure_url;
      await WeddingPhoto.create({ url: image });
    }

    revalidatePath('/');
    return { message: "Successful!", status: 201 };
  } catch (error) {
    console.log(error)
    return { message: "Something went wrong, Please try again!", status: 400 };
  }
}