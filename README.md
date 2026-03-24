# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Shopping App - Modernized Full-Stack Platform

## 🚀 Getting Started

### 1. Start MongoDB (Windows)
To run this project, you need MongoDB running locally:
- **Option A (Easiest)**: Open **MongoDB Compass**. It usually starts the service automatically.
- **Option B (Command Line)**: Open a terminal and type `mongod`.
- **Option C (Services)**: Press `Win + R`, type `services.msc`, find **MongoDB Server**, and click **Start**.

### 2. Seed the Database
Before running the app for the first time, populate it with demo data:
```bash
cd backend
node seed.js
```

### 3. Run the Application
- **Backend**: `cd backend && node server.js`
- **Frontend**: `cd frontend && npm run dev`

## 🏗️ Project Structure
- `backend/`: Node.js/Express API & MongoDB Models.
- `frontend/`: React/Vite UI & Context Providers.

## 🔑 Demo Credentials
- **Admin**: `admin@example.com` / `admin123`
- **Shopkeeper**: `shop@example.com` / `shop123`
- **Customer**: `user@example.com` / `user123`

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
