import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
app.use(express.json());
app.use(cors());

import Product from './models/Product.js';
import products from './seeder/products.js';

const mongo_url = process.env.MONGO_URI;

mongoose
  .connect(mongo_url)
  .then(async () => {
    console.log("MongoDB connected successfully");
    try {
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('Database empty. Seeding products...');
        await Product.insertMany(products);
        console.log('Successfully seeded 20 products!');
      } else {
        console.log(`Database already has ${count} products.`);
      }
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  })
  .catch((err) => console.log("Unable to connect to MongoDB", err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});