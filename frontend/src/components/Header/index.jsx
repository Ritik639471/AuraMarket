import React, { useState } from 'react';
import '../../index.css';
import { Link, useNavigate } from 'react-router-dom';
import logoAura from '../../assets/logo_aura.png';
import Search from '../Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IoGitCompare, IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineShoppingBag, MdOutlineAccountCircle } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { LiaAngleDownSolid } from "react-icons/lia";
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Navigation from '../Navigation';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useCompare } from '../../context/CompareContext';
import { useThemeContext } from '../../context/ThemeContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#ff5252',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '11px',
    right: -2,
    top: 10,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { compareList } = useCompare();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100 dark:border-slate-800 transition-colors duration-250">
      {/* 1. Top Announcement Bar */}
      <div className="hidden sm:block py-1.5 border-b border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-[12px] text-slate-600 dark:text-slate-400">
        <div className="container mx-auto max-w-[1500px] px-4 flex justify-between items-center">
          <p className="m-0 font-medium truncate">
            ✨ Get up to 50% off new season styles • Express Worldwide Delivery
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <Link to="/" className="text-[12px] font-medium text-slate-600 dark:text-slate-400 hover:text-[#ff5252] dark:hover:text-[#ff5252] no-underline transition-colors">
              Help Center
            </Link>
            <Link to="/myorders" className="text-[12px] font-medium text-slate-600 dark:text-slate-400 hover:text-[#ff5252] dark:hover:text-[#ff5252] no-underline transition-colors">
              Order Tracking
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="py-2.5 sm:py-3 relative z-30">
        <div className="container mx-auto max-w-[1500px] px-4">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Brand Logo */}
            <div className="shrink-0 flex items-center">
              <Link to="/" className="flex items-center no-underline group">
                <img src={logoAura} className="h-[36px] sm:h-[42px] rounded-lg shadow-sm" alt="AuraMarket" />
                <span className="text-xl sm:text-2xl font-black text-[#2b3445] dark:text-white ml-2 tracking-tight">AURA</span>
                <span className="text-xl sm:text-2xl font-black text-[#ff5252]">MARKET</span>
              </Link>
            </div>

            {/* Desktop / Tablet Search Bar (Center) */}
            <div className="hidden md:flex flex-1 justify-center max-w-[560px] mx-2 relative z-40">
              <Search />
            </div>

            {/* Right Side Actions: Theme Switcher, User Menu & Action Badges */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Dark / Light Mode Toggle Button */}
              <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <IconButton 
                  onClick={toggleTheme} 
                  className="!p-1.5 sm:!p-2 text-slate-700 dark:text-slate-300 hover:text-[#ff5252] dark:hover:text-[#ff5252] transition-transform hover:scale-110"
                >
                  {isDarkMode ? (
                    <IoSunnyOutline className="text-[20px] text-amber-400 animate-pulse" />
                  ) : (
                    <IoMoonOutline className="text-[19px] text-slate-700 hover:text-[#ff5252]" />
                  )}
                </IconButton>
              </Tooltip>

              {/* User Account / Profile Menu */}
              {user ? (
                <div>
                  <button
                    onClick={handleOpenUserMenu}
                    className="flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#ff5252] text-white flex items-center justify-center text-xs font-bold uppercase">
                      {user.name ? user.name.charAt(0) : 'U'}
                    </span>
                    <span className="hidden sm:inline max-w-[80px] truncate">{user.name?.split(' ')[0] || 'Account'}</span>
                    <LiaAngleDownSolid className="text-xs text-slate-500 dark:text-slate-400" />
                  </button>

                  <Menu
                    anchorEl={anchorEl}
                    open={openUserMenu}
                    onClose={handleCloseUserMenu}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                      elevation: 4,
                      sx: {
                        borderRadius: '16px',
                        minWidth: 200,
                        mt: 1,
                        border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9',
                        bgcolor: isDarkMode ? '#1e293b' : '#ffffff',
                        color: isDarkMode ? '#f8fafc' : '#0f172a',
                        '& .MuiMenuItem-root': {
                          fontSize: '13.5px',
                          fontWeight: 500,
                          py: 1,
                          gap: 1.5,
                          '&:hover': {
                            bgcolor: isDarkMode ? '#334155' : '#f8fafc',
                          }
                        },
                      },
                    }}
                  >
                    <div className={`px-4 py-2 mb-1 border-b ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                      <p className="text-xs font-bold m-0 truncate">{user.name}</p>
                      <p className="text-[11px] opacity-70 m-0 capitalize">{user.role || 'Member'}</p>
                    </div>

                    <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
                      <MdOutlineAccountCircle className="text-lg opacity-80" /> My Profile
                    </MenuItem>

                    {user.role === 'customer' && (
                      <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/myorders'); }}>
                        <MdOutlineShoppingBag className="text-lg opacity-80" /> My Orders
                      </MenuItem>
                    )}

                    {(user.role === 'admin' || user.role === 'shopkeeper') && (
                      <MenuItem onClick={() => { 
                        handleCloseUserMenu(); 
                        navigate(user.role === 'admin' ? "/admin" : "/shopkeeper"); 
                      }}>
                        <MdOutlineDashboard className="text-lg opacity-80" /> Dashboard
                      </MenuItem>
                    )}

                    <Divider sx={{ my: 0.5, borderColor: isDarkMode ? '#334155' : '#e2e8f0' }} />

                    <MenuItem onClick={handleLogout} sx={{ color: '#ff5252 !important' }}>
                      <IoLogOutOutline className="text-lg text-[#ff5252]" /> Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Link
                    to="/login"
                    className="hidden sm:inline-flex items-center text-xs sm:text-[13px] font-bold text-slate-700 dark:text-slate-300 hover:text-[#ff5252] dark:hover:text-[#ff5252] px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 no-underline transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="hidden sm:inline-flex items-center text-xs sm:text-[13px] font-bold bg-[#ff5252] hover:bg-[#e34e4e] text-white px-3.5 py-1.5 rounded-full no-underline shadow-sm transition-colors"
                  >
                    Register
                  </Link>
                  <Tooltip title="Login / Register">
                    <IconButton component={Link} to="/login" className="sm:!hidden !p-1.5">
                      <FaRegUser className="text-slate-700 dark:text-slate-300 text-[18px]" />
                    </IconButton>
                  </Tooltip>
                </div>
              )}

              {/* Compare Icon */}
              <Tooltip title="Compare">
                <IconButton aria-label="compare" component={Link} to="/compare" className="!p-1.5 sm:!p-2">
                  <StyledBadge badgeContent={compareList.length} color="secondary">
                    <IoGitCompare className="text-slate-700 dark:text-slate-300 text-[19px] hover:text-[#ff5252] transition-colors" />
                  </StyledBadge>
                </IconButton>
              </Tooltip>

              {/* Wishlist Icon */}
              <Tooltip title="Wishlist">
                <IconButton aria-label="wishlist" component={Link} to="/wishlist" className="!p-1.5 sm:!p-2">
                  <StyledBadge badgeContent={wishlist.length} color="secondary">
                    <FaRegHeart className="text-slate-700 dark:text-slate-300 text-[19px] hover:text-[#ff5252] transition-colors" />
                  </StyledBadge>
                </IconButton>
              </Tooltip>

              {/* Cart Icon */}
              <Tooltip title="Cart">
                <IconButton aria-label="cart" component={Link} to="/cart" className="!p-1.5 sm:!p-2">
                  <StyledBadge badgeContent={cart.length} color="secondary">
                    <ShoppingCartIcon className="text-slate-700 dark:text-slate-300 text-[20px] hover:text-[#ff5252] transition-colors" />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* Mobile Search Bar Row (renders full-width under logo and action icons on mobile) */}
          <div className="mt-2.5 md:hidden w-full relative z-40">
            <Search />
          </div>
        </div>
      </div>

      {/* Categories & Sub-Navigation */}
      <Navigation />
    </header>
  );
};

export default Header;