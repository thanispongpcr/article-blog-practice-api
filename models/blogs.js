import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    content: {
      type: {},
      required: true,
    },
    author: {
      type: "string",
      default: "Admin",
    },
    slug: {
      type: "string",
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Blogs", blogSchema);
