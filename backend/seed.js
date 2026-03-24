import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Ad from './models/Ad.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/auramarket');
        
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
            { name: 'MacBook Pro M3 Max', description: 'Ultimate power for pros. Liquid Retina XDR display.', price: 3499, category: 'Electronics', stock: 15, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1517336714468-450583ad716d' },
            { name: 'Aura Premium Silk Saree', description: 'Handcrafted traditional elegance for every occasion.', price: 120, category: 'Fashion', stock: 25, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c' },
            { name: 'Aura Ultra-Lite Sneakers', description: 'Engineered for comfort and speed. Modern aesthetic.', price: 85, category: 'Footwears', stock: 50, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
            { name: 'Classic Leather Tote', description: 'Spacious and durable. Perfect for daily essentials.', price: 150, category: 'Bags', stock: 30, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1584917033904-493bb3c3d1aa' },
            { name: 'Organic Matcha Green Tea', description: 'Premium ceremonial grade. 100% pure and natural.', price: 25, category: 'Groceries', stock: 100, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97' },
            { name: 'Radiant Glow Face Serum', description: 'Hydrating and brightening. Vegan and cruelty-free.', price: 45, category: 'Beauty', stock: 40, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7abc7020' },
            { name: 'Eco-Friendly Yoga Mat', description: 'Non-slip surface. Sustains your practice and the planet.', price: 60, category: 'Wellness', stock: 20, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f' },
            { name: 'Gold-Plated Minimalist Ring', description: 'Timeless design. 18k gold plating on sterling silver.', price: 95, category: 'Jewellery', stock: 15, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e' },
            { name: 'Nordic Style Coffee Table', description: 'Sleek wood finish. Elevates your living space.', price: 450, category: 'Home Decor', stock: 10, shopkeeper: demoShopkeeper._id, image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88' }
        ]);

        // Create Ads
        await Ad.insertMany([
            { title: 'AuraMarket Season Launch: 50% Off!', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da', active: true },
            { title: 'New Arrivals: Aura Luxury Collection', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8', active: true },
            { title: 'Tech Week: Elevate Your Workspace', image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b', active: true }
        ]);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
