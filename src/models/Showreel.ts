import mongoose, { Schema } from "mongoose";

const ShowreelSchema = new Schema({
  videoUrl: { type: String, default: "" },
  title: { type: String, default: "AFTERLIGHTFX REEL 2026" },
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

export default mongoose.models.Showreel || mongoose.model("Showreel", ShowreelSchema);
