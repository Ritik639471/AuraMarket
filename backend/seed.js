import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Ad from './models/Ad.js';
import Category from './models/Category.js';
import dns from 'dns';

// Force Google DNS to fix ECONNREFUSED querySrv errors on Windows/ISP
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/auramarket');
        
        // Clear existing data
        await User.deleteMany();
        await Product.deleteMany();
        await Ad.deleteMany();
        await Category.deleteMany();

        // Create Users
        const demoShopkeeper = await User.create({
            name: 'Demo Shopkeeper',
            email: 'shop@example.com',
            password: 'shop123',
            role: 'shopkeeper'
        });
        const demoAdmin = await User.create({
            name: 'Demo Admin',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin'
        });

        // Create Categories
        const categoriesData = [
            {
                name: "Fashion",
                image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80",
                subcategories: [
                    { name: "Women", items: ["Sarees", "Tops", "Jeans"] },
                    { name: "Girls", items: ["Kurtas & Suits", "Tops"] },
                    { name: "Children", items: ["T-shirt", "Jeans", "Kurtis", "Lower & Pants"] },
                    { name: "Men", items: ["Jeans", "Formal", "T-shirt"] },
                ]
            },
            {
                name: "Electronics",
                image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80",
                subcategories: [
                    { name: "Laptops", items: ["Lenovo", "Asus", "Dell", "MAC"] },
                    { name: "Smart Watch", items: ["Samsung", "Apple", "OnePlus", "Fitbit"] },
                    { name: "Mobile", items: ["Apple", "Samsung", "OPPO", "Vivo", "OnePlus"] },
                ]
            },
            {
                name: "Bags",
                image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80",
                subcategories: [
                    { name: "Men Bags", items: [] },
                    { name: "Women Bags", items: [] },
                    { name: "Kids Bags", items: [] },
                ]
            },
            {
                name: "Footwears",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80",
                subcategories: [
                    { name: "Men", items: [] },
                    { name: "Women", items: [] },
                    { name: "Kids", items: [] },
                ]
            },
            { name: "Groceries", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80", subcategories: [] },
            { name: "Beauty", image: "https://images.unsplash.com/photo-1522335155310-1dc4126584d5?auto=format&fit=crop&q=80", subcategories: [] },
            { name: "Wellness", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80", subcategories: [] },
            { name: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80", subcategories: [] },
            { name: "Home Decor", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80", subcategories: [] },
        ];
        await Category.insertMany(categoriesData);

        // Create Products (Multiple for EACH Category)
        const productsData = [
            // Fashion
            { name: 'Aura Premium Silk Saree', description: 'Handcrafted traditional elegance for every occasion.', price: 120, category: 'Fashion', subCategory: 'Women', division: 'Sarees', stock: 25, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1583391733958-d698188bd0d4?auto=format&fit=crop&q=80'] },
            { name: 'Men Classic Denim Jacket', description: 'Vintage wash, durable denim perfect for casual wear.', price: 85, category: 'Fashion', subCategory: 'Men', division: 'Jeans', stock: 40, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80'] },
            { name: 'Women Summer Floral Dress', description: 'Light, breathable cotton dress for warm days.', price: 55, category: 'Fashion', subCategory: 'Women', division: 'Tops', stock: 30, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1515347619252-19e487a552dc?auto=format&fit=crop&q=80'] },

            // Electronics
            { name: 'MacBook Pro M3 Max', description: 'Ultimate power for pros. Liquid Retina XDR display.', price: 3499, category: 'Electronics', subCategory: 'Laptops', division: 'MAC', stock: 15, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1517336714468-450583ad716d?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80'] },
            { name: 'Sony Noise Cancelling Headphones', description: 'Industry-leading noise cancellation and premium audio.', price: 298, category: 'Electronics', subCategory: 'Smart Watch', stock: 50, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80'] },
            { name: 'Samsung Galaxy S24 Ultra', description: 'Titanium frame, AI features, and 200MP camera.', price: 1299, category: 'Electronics', subCategory: 'Mobile', division: 'Samsung', stock: 20, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?auto=format&fit=crop&q=80'] },

            // Bags
            { name: 'Classic Leather Tote', description: 'Spacious and durable. Perfect for daily essentials.', price: 150, category: 'Bags', subCategory: 'Women Bags', stock: 30, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1584917033904-493bb3c3d1aa?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80'] },
            { name: 'Adventure Hiking Backpack', description: 'Water-resistant, ergonomic design with laptop sleeve.', price: 90, category: 'Bags', subCategory: 'Men Bags', stock: 45, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&q=80'] },
            
            // Footwears
            { name: 'Aura Ultra-Lite Sneakers', description: 'Engineered for comfort and speed. Modern aesthetic.', price: 85, category: 'Footwears', subCategory: 'Men', stock: 50, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80'] },
            { name: 'Formal Oxford Leather Shoes', description: 'Hand-stitched Italian leather for professional wear.', price: 120, category: 'Footwears', subCategory: 'Men', stock: 35, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1614252339460-e144a95a8f4c?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80'] },

            // Groceries
            { name: 'Organic Matcha Green Tea', description: 'Premium ceremonial grade. 100% pure and natural.', price: 25, category: 'Groceries', stock: 100, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1596706798031-bb61bb41a7d6?auto=format&fit=crop&q=80'] },
            { name: 'Artisan Roasted Coffee Beans', description: 'Single-origin, ethically sourced dark roast.', price: 18, category: 'Groceries', stock: 120, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80'] },

            // Beauty
            { name: 'Radiant Glow Face Serum', description: 'Hydrating and brightening. Vegan and cruelty-free.', price: 45, category: 'Beauty', stock: 40, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1601049541289-9b1b7abc7020?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80'] },
            { name: 'Matte Liquid Lipstick Set', description: 'Long-lasting, smudge-proof colors for every mood.', price: 30, category: 'Beauty', stock: 65, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1571781526291-c477eb312789?auto=format&fit=crop&q=80'] },

            // Wellness
            { name: 'Eco-Friendly Yoga Mat', description: 'Non-slip surface. Sustains your practice and the planet.', price: 60, category: 'Wellness', stock: 20, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1599427302484-93c6f2e96030?auto=format&fit=crop&q=80'] },
            { name: 'Aromatherapy Essential Oil Diffuser', description: 'Ultrasonic technology with 7 LED light modes.', price: 35, category: 'Wellness', stock: 45, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1608528577891-eb055944f2e7?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80'] }, // Fallback image for 2nd

            // Jewellery
            { name: 'Gold-Plated Minimalist Ring', description: 'Timeless design. 18k gold plating on sterling silver.', price: 95, category: 'Jewellery', stock: 15, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80'] },
            { name: 'Diamond Tear-Drop Necklace', description: 'Elegant and sophisticated 1-carat diamond pendant.', price: 899, category: 'Jewellery', stock: 8, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1599643478514-4a820cbf311e?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80'] },

            // Home Decor
            { name: 'Nordic Style Coffee Table', description: 'Sleek wood finish. Elevates your living space.', price: 450, category: 'Home Decor', stock: 10, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80'] },
            { name: 'Boho Macrame Wall Hanging', description: 'Handwoven cotton decor piece for a cozy room.', price: 40, category: 'Home Decor', stock: 30, shopkeeper: demoShopkeeper._id, images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80'] }
        ];
        await Product.insertMany(productsData);

        // Create Ads (with links routing to actual categories)
        await Ad.insertMany([
            { title: 'AuraMarket Season Launch: 50% Off!', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80', link: '/products?search=Fashion', active: true },
            { title: 'New Arrivals: Aura Luxury Collection', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80', link: '/products?search=Fashion', active: true },
            { title: 'Tech Week: Elevate Your Workspace', image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80', link: '/products?search=Electronics', active: true },
            { title: 'Beauty Bonanza', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80', link: '/products?search=Beauty', active: true },
            { title: 'Home Makeover Sale', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80', link: '/products?search=Home Decor', active: true }
        ]);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
