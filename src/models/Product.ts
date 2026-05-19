import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, default: "" }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(doc, ret: any) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
