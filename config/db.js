import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://coder:coder123@cluster0.doos3ga.mongodb.net/');
        console.log('DB connected');
    } catch (error) {
        console.error('DB connection error:', error);
        process.exit(1);
    }
};
//mongodb://127.0.0.1:27017/Food-Delivery