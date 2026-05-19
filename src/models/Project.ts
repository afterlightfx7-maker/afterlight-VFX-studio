import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ["3D", "VFX", "Motion"], required: true },
  mediaSrc: { type: String, default: "" },
  mediaType: { type: String, enum: ["image", "video"], required: true },
  size: { type: String, enum: ["large", "tall", "small"], required: true },
  bg: { type: String, default: "" }
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

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
