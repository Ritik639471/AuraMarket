import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Ad from './models/Ad.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopping-app');
        
        // Clear existing data
        await User.deleteMany();
        await Product.deleteMany();
        await Ad.deleteMany();

        // Create Users
        const salt = await bcrypt.genSalt(10);
        const demoAdmin = await User.create({
            name: 'Demo Admin',
            email: 'admin@example.com',
            password: await bcrypt.hash('admin123', salt),
            role: 'admin'
        });

        const demoShopkeeper = await User.create({
            name: 'Demo Shopkeeper',
            email: 'shop@example.com',
            password: await bcrypt.hash('shop123', salt),
            role: 'shopkeeper'
        });

        const demoCustomer = await User.create({
            name: 'Demo Customer',
            email: 'user@example.com',
            password: await bcrypt.hash('user123', salt),
            role: 'customer'
        });

        // Create Products
        const products = await Product.insertMany([
            { name: 'MacBook Pro M2', description: 'Powerful Apple laptop', price: 1999, category: 'Electronics', stock: 10, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1517336714468-450583ad716d?auto=format&fit=crop&q=80&w=300' },
            { name: 'Leather Jacket', description: 'Premium black leather', price: 299, category: 'Fashion', stock: 5, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=300' },
            { name: 'Smart Watch', description: 'Health monitoring watch', price: 199, category: 'Electronics', stock: 20, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300' }
        ]);

        // Create Ads
        await Ad.insertMany([
            { title: 'Big Summer Sale!', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200', active: true },
            { title: 'New Arrivals in Fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200', active: true }
        ]);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
