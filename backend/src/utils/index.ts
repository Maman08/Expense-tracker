import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://a34mritunjaysingh:zp8WLlLD94ocYfYZ@cluster0.geqrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/assingment', {

    });
    console.log('Database connected successfully');
  } catch (error:any) {
    console.error('Database connection failed:', error.message);
    process.exit(1); 
  }
};

export default connectDB;


