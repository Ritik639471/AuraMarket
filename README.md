# 🛒 AuraMarket 

![AuraMarket Banner](https://placehold.co/1200x300/1e293b/ffffff.png?text=AuraMarket+-+Modern+MERN+E-Commerce)

> A modern, full-stack e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). AuraMarket provides a seamless shopping experience with features for customers, shopkeepers, and administrators.

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI" />
</p>

## ✨ Features

- **🛍️ Complete E-Commerce Flow:** Browse products, view details, add to cart, and checkout.
- **🔐 Secure Authentication:** JWT-based authentication with bcrypt password hashing.
- **👥 Role-Based Access Control:** Distinct roles for Admin, Shopkeeper, and Customer.
- **🎨 Modern UI/UX:** Responsive design using Tailwind CSS, Material UI, and styled-components.
- **⚡ Fast Performance:** Built with Vite for rapid development and optimized production builds.
- **🗄️ Robust Backend:** RESTful API built with Express and MongoDB (Mongoose).

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS, Material UI (@mui/material), Styled Components
- **Routing:** React Router DOM
- **Icons & UI:** React Icons, Swiper (Carousels), React Inner Image Zoom

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Security & Auth:** JSON Web Tokens (JWT), bcryptjs, CORS

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB installed locally or a MongoDB Atlas URI
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/auramarket.git
cd auramarket
```

### 2. Install Dependencies

Install packages for both frontend and backend:

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the `backend/` directory and configure the following variables (adjust as needed):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/auramarket
JWT_SECRET=your_super_secret_jwt_key
```

### 4. Start MongoDB (Windows)

Ensure your MongoDB server is running:
- **Option A (Easiest)**: Open **MongoDB Compass**.
- **Option B (Command Line)**: Open a terminal and type `mongod`.
- **Option C (Services)**: Press `Win + R`, type `services.msc`, find **MongoDB Server**, and click **Start**.

### 5. Seed the Database

Populate the database with initial dummy data (products, categories, users):

```bash
cd backend
node seed.js
```

### 6. Run the Application

You'll need two terminal windows to run both the frontend and backend simultaneously.

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

The application will now be running. The frontend typically runs on `http://localhost:5173`.

## 🔑 Demo Credentials

If you seeded the database, you can log in using the following test accounts:

| Role       | Email | Password |
| :---       | :---  | :---     |
| **Admin**      | `admin@example.com` | `admin123` |
| **Shopkeeper** | `shop@example.com` | `shop123` |
| **Customer**   | `user@example.com` | `user123` |

## 🏗️ Project Structure

```text
auramarket/
├── backend/                # Node.js/Express API
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── controllers/        # Request handlers
│   ├── server.js           # Entry point
│   └── package.json
└── frontend/               # React UI
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components (Home, ProductListing, etc.)
    │   ├── context/        # React Context providers (CompareContext, etc.)
    │   ├── App.jsx         # Main application component
    │   └── main.jsx        # Entry point
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🔧 Troubleshooting Git Push

If you are setting up your own repository and see an error like `fatal: 'origin' does not appear to be a git repository`, run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/auramarket.git
git branch -M main
git push -u origin main
```
*(Remember to replace the URL with your actual GitHub repository URL)*

## 📄 License

This project is licensed under the ISC License.
