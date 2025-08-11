import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Stop the server if DB fails
  }
};

export default connectDB;

/*
Mongoose = A JavaScript ODM (Object Data Modeling) library that connects your Express app to MongoDB. 
It simplifies working with the database using schemas, models, middleware (hooks), and a clean, intuitive syntax.
process.exit(1); for fail condition and process.exit(0); for success condition
*/
