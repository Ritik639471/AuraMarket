import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import User from './models/User.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Ad from './models/Ad.js';

// Fix Atlas DNS resolution in certain network/ISP environments
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const categoriesData = [
    {
        name: "Fashion",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
        subcategories: [{ name: "mens clothing" }, { name: "womens clothing" }, { name: "footwear" }, { name: "accessories" }]
    },
    {
        name: "Electronics",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80",
        subcategories: [{ name: "smartphones" }, { name: "laptops" }, { name: "audio" }, { name: "accessories" }]
    },
    {
        name: "Beauty & Wellness",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
        subcategories: [{ name: "skincare" }, { name: "fragrances" }, { name: "haircare" }]
    },
    {
        name: "Home Decor",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
        subcategories: [{ name: "furniture" }, { name: "lighting" }, { name: "kitchen" }]
    },
    {
        name: "Jewellery & Watches",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
        subcategories: [{ name: "watches" }, { name: "rings" }, { name: "necklaces" }]
    }
];

const seedData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/auramarket');
        console.log('✓ Connected successfully.');

        // 1. Ensure Default Demo Users
        let shopkeeper = await User.findOne({ email: 'shop@example.com' });
        if (!shopkeeper) {
            shopkeeper = await User.create({
                name: 'Demo Shopkeeper',
                email: 'shop@example.com',
                password: 'shop123',
                role: 'shopkeeper'
            });
            console.log('✓ Created Demo Shopkeeper (shop@example.com / shop123)');
        }

        let admin = await User.findOne({ email: 'admin@example.com' });
        if (!admin) {
            admin = await User.create({
                name: 'Demo Admin',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin'
            });
            console.log('✓ Created Demo Admin (admin@example.com / admin123)');
        }

        let customer = await User.findOne({ email: 'aarav@example.com' });
        if (!customer) {
            customer = await User.create({
                name: 'Aarav Sharma',
                email: 'aarav@example.com',
                password: 'user123',
                role: 'customer'
            });
            console.log('✓ Created Demo Customer (aarav@example.com / user123)');
        }

        // 2. Synchronize Categories
        console.log('Synchronizing categories...');
        for (const cat of categoriesData) {
            const exists = await Category.findOne({ name: cat.name });
            if (!exists) {
                await Category.create(cat);
            }
        }
        console.log('✓ Categories ready.');

        // 3. Ensure Starter Showcase Products
        const sampleProducts = [
            {
                name: "Aura Minimalist Mechanical Watch",
                description: "Handcrafted automatic timepiece featuring sapphire crystal glass, 316L stainless steel casing, and genuine Italian leather strap.",
                price: 249,
                category: "Jewellery & Watches",
                subCategory: "watches",
                division: "Aura Signature",
                stock: 25,
                rating: 4.9,
                numReviews: 1,
                shopkeeper: shopkeeper._id,
                images: [
                    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
                ],
                reviews: [
                    {
                        user: customer._id,
                        name: customer.name,
                        rating: 5,
                        comment: "Exceptional craftsmanship! Arrived in luxury packaging."
                    }
                ]
            },
            {
                name: "Aura SoundPulse ANC Wireless Headphones",
                description: "Studio-grade active noise cancelling over-ear headphones with 45-hour battery life, spatial audio, and memory foam ear cushions.",
                price: 199,
                category: "Electronics",
                subCategory: "audio",
                division: "Aura Sound",
                stock: 40,
                rating: 4.8,
                numReviews: 1,
                shopkeeper: shopkeeper._id,
                images: [
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
                ],
                reviews: [
                    {
                        user: customer._id,
                        name: customer.name,
                        rating: 5,
                        comment: "Best noise cancellation and battery life I have ever tested."
                    }
                ]
            },
            {
                name: "Aura Silk Cashmere Blend Scarf",
                description: "Sumptuously soft mulberry silk and organic cashmere blend woven by master artisans. Elegant drape and all-season warmth.",
                price: 89,
                category: "Fashion",
                subCategory: "accessories",
                division: "Aura Atelier",
                stock: 30,
                rating: 5.0,
                numReviews: 1,
                shopkeeper: shopkeeper._id,
                images: [
                    "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80"
                ],
                reviews: [
                    {
                        user: customer._id,
                        name: customer.name,
                        rating: 5,
                        comment: "Incredibly soft and lightweight. Matches everything."
                    }
                ]
            },
            {
                name: "Aura Artisan Ceramic Pour-Over Set",
                description: "Hand-thrown stoneware coffee dripper with matching serving carafe and walnut coaster. Designed for specialty coffee enthusiasts.",
                price: 65,
                category: "Home Decor",
                subCategory: "kitchen",
                division: "Aura Living",
                stock: 18,
                rating: 4.8,
                numReviews: 1,
                shopkeeper: shopkeeper._id,
                images: [
                    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                ],
                reviews: [
                    {
                        user: customer._id,
                        name: customer.name,
                        rating: 5,
                        comment: "Gorgeous piece for my kitchen counter. Brews clean, delicious coffee."
                    }
                ]
            }
        ];

        for (const prod of sampleProducts) {
            const exists = await Product.findOne({ name: prod.name });
            if (!exists) {
                await Product.create(prod);
                console.log(`+ Seeded product: ${prod.name}`);
            }
        }
        console.log('✓ Products verified.');

        // 4. Ensure Promotional Banner Ads
        const sampleAds = [
            {
                title: 'Aura Season Launch: 50% Off Fashion & Trends',
                description: 'Discover the latest runway collections and handcrafted accessories.',
                image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
                link: '/products?category=Fashion',
                active: true,
                status: 'approved'
            },
            {
                title: 'Tech Week: Elevate Your Workspace',
                description: 'Top-tier laptops, audio, and flagship mobile accessories.',
                image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1200&q=80',
                link: '/products?category=Electronics',
                active: true,
                status: 'approved'
            }
        ];

        for (const ad of sampleAds) {
            const exists = await Ad.findOne({ title: ad.title });
            if (!exists) {
                await Ad.create(ad);
            }
        }
        console.log('✓ Promotional ads verified.');

        console.log('\n🎉 AuraMarket seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedData();
