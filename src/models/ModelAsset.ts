import mongoose, { Schema } from "mongoose";

const ModelAssetSchema = new Schema({
  name: { type: String, required: true },
  polys: { type: String, required: true },
  textures: { type: String, required: true },
  time: { type: String, required: true },
  modelUrl: { type: String, default: "" },
  color: { type: String, required: true }
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

export default mongoose.models.ModelAsset || mongoose.model("ModelAsset", ModelAssetSchema);
