import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import dns from 'dns';

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongo_url = process.env.MONGO_URI || "mongodb+srv://blessymolcharls_db_user:8UOkUCv9EL8DmZpF@cluster0.3htapmv.mongodb.net/?appName=Cluster0";

const seedAdmin = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log('MongoDB Connected');

    const adminExists = await User.findOne({ email: 'admin@cartzo.com' });

    if (adminExists) {
      // Just ensure they are admin
      adminExists.isAdmin = true;
      if (!adminExists.password.startsWith('$2a$')) {
          // If the password isn't hashed properly (e.g. they registered normally with 'admin123')
          adminExists.password = await bcrypt.hash('admin123', 10);
      }
      await adminExists.save();
      console.log('Admin user updated successfully');
      process.exit();
    }

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@cartzo.com',
      password: await bcrypt.hash('admin123', 10),
      isAdmin: true,
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
