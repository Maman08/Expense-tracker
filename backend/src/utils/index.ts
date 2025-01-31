import mongoose from 'mongoose';

const connectDB = async () => {
  try {

    });
    console.log('Database connected successfully');
  } catch (error:any) {
    console.error('Database connection failed:', error.message);
    process.exit(1); 
  }
};

export default connectDB;


