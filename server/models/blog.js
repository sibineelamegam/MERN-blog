import mongoose from "mongoose";
import Counter from "./counter.js";

// A reusable function to capitalize the first letter of a string
const capitalize = (value) => {
  if (typeof value !== 'string' || value.length === 0) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

// Blog schema definition
const blogSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      set: capitalize, // Use the setter here
    },
    description: {
      type: String,
      required: true,
      set: capitalize, // Use the setter here
    },
    content: {
      type: String,
      required: true,
      set: capitalize, // Use the setter here
    },
    image: {
      type: String, 
    },
    author: {
      type: String,
      required: true,
      trim: true,
      set: capitalize, // Use the setter here
    },
  },
  {
    timestamps: true,
  }
);

// Auto-increment blog ID before saving. This hook is still necessary for the custom ID.
blogSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "blog" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      const BLOG_PREFIX = "b";
      this.id = BLOG_PREFIX + counter.seq;
    } catch (err) {
      console.error("Error generating blog ID:", err);
      return next(err);
    }
  }

  next();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
