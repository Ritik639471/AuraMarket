import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import Home from './pages/home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';
import Footer from './components/Footer';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
              <Route path="/myorders" element={<MyOrders />} />
                <Route path="/shopkeeper" element={<ShopkeeperDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
