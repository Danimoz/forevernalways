import { Photo } from "@/types";
import { Schema, model, models } from "mongoose";

const photoSchema = new Schema<Photo>({
  url: { type: String, required: true },
}, { timestamps: true });

export default models.Photo || model<Photo>("Photo", photoSchema);