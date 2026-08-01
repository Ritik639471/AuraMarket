import React from 'react'
import '../../index.css'
import { Link } from 'react-router-dom'
import logoAura from '../../assets/logo_aura.png'
import Search from '../Search'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navigation from '../Navigation';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Button } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#ff5252',
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
    const { user, logout } = useAuth();
    const { wishlist } = useWishlist();
    const { cart } = useCart();
    
    return (
    <header className="bg-white/85 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="py-2 border-y border-gray-200">
        <div className="container mx-auto max-w-[1300px] px-4">
          <div className="flex justify-between items-center">
            <div className="w-1/2">
              <p className="text-sm font-medium text-gray-700">Get up to 50% off new season styles, limited time only</p>
            </div>
            <div className="flex justify-end items-center">
              <ul className="flex gap-4 list-none items-center m-0 p-0">
                <li><Link to="/" className="text-[13px] font-medium no-underline transition-all duration-300 hover:text-blue-600">Help Center</Link></li>
                <li><Link to="/myorders" className="text-[13px] font-medium no-underline transition-all duration-300 hover:text-blue-600">Order Tracking</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="py-3 border-b border-gray-300">
        <div className="container mx-auto max-w-[1300px] px-4 flex justify-between items-center">
          <div className="w-1/4 flex items-center gap-2">
            <Link to={"/"} className="flex items-center no-underline">
              <img src={logoAura} className="h-[45px] rounded-lg" alt="AuraMarket" />
              <span className="text-2xl font-extrabold text-[#2b3445] ml-2 italic tracking-wide">AURA</span>
              <span className="text-2xl font-normal text-[#ff5252]">MARKET</span>
            </Link>
          </div>
          
          <div className="w-[45%]">
            <Search />
          </div>
          
          <div className="w-[30%] flex items-center pl-7 justify-end">
            <ul className="flex gap-4 list-none m-0 p-0 items-center">
              {user ? (
                <>
                  {user.role === 'customer' && <li><Link to="/myorders" className="text-[15px] font-medium no-underline transition-all duration-300 hover:text-blue-600">My Orders</Link></li>}
                  <li><Link to={user.role === 'admin' ? "/admin" : user.role === 'shopkeeper' ? "/shopkeeper" : "/"} className="text-[15px] font-medium no-underline transition-all duration-300 hover:text-blue-600">Dashboard</Link></li>
                  <li><Button onClick={logout} className="text-[15px] font-medium no-underline transition-all duration-300 hover:text-blue-600" sx={{ textTransform: 'none', color: 'inherit', p: 0, minWidth: 'auto' }}>Logout</Button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="text-[15px] font-medium no-underline transition-all duration-300 hover:text-blue-600">Login</Link></li>
                  <li><Link to="/register" className="text-[15px] font-medium no-underline transition-all duration-300 hover:text-blue-600">Register</Link></li>
                </>
              )}
              <li>
                <Tooltip title="Compare" >
                  <IconButton aria-label="compare">
                    <StyledBadge badgeContent={0} color="secondary">
                      <IoGitCompare className="text-gray-700 hover:text-blue-600 transition-colors" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Wishlist">
                  <IconButton aria-label="wishlist" component={Link} to="/wishlist">
                    <StyledBadge badgeContent={wishlist.length} color="secondary">
                      <FaRegHeart className="text-gray-700 hover:text-blue-600 transition-colors" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Cart">
                  <IconButton aria-label="cart" component={Link} to="/cart">
                    <StyledBadge badgeContent={cart.length} color="secondary">
                      <ShoppingCartIcon className="text-gray-700 hover:text-blue-600 transition-colors" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation />

    </header>
  )
}

export default Header