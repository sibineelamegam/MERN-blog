// createAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/user.js";

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Exit with error
  }
};

// Create Admin User
const createAdmin = async () => {
  await connectDB();

  try {
    // Check if admin user with the username 'shaan' already exists
    const existingAdmin = await User.findOne({ username: "shaan" });
    if (existingAdmin) {
      console.log('Admin user with username "shaan" already exists.');
      return process.exit(0); // Exit successfully
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("your-secure-password-here", 10); // enter your password

    // Create new admin user
    const admin = new User({
      username: "your-username-here", // enter your name
      email: "your-email-here", // enter your id
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created successfully.");
  } catch (err) {
    console.error("Failed to create admin user:", err.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close(); // Always close DB connection
  }
};

createAdmin();
