import React from 'react'
import '../../index.css'
import { Link } from 'react-router-dom'
import Search from '../Search'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navigation from '../Navigation';
import './header.css'
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
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
    return (
    <header className="header">
      <div className="top-strip">
        <div className="container">
          <div className="top-row">
            <div className="top-col1">
              <p className="top-message">Get up to 50% off new season styles,limited time only</p>
            </div>
            <div className="top-col2">
              <ul className="top-links">
                <li><Link to="help-center" className='top-link'>Help Center</Link></li>
                <li><Link to="order-tracking" className='top-link'>Order Tracking</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-container">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to={"/"} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src="/src/assets/logo_aura.png" style={{ height: '45px', borderRadius: '8px' }} alt="AuraMarket" />
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#2b3445', marginLeft: '10px', fontStyle: 'italic', letterSpacing: '1px' }}>AURA</span>
              <span style={{ fontSize: '24px', fontWeight: 400, color: '#ff5252' }}>MARKET</span>
            </Link>
          </div>
          <div className="search-box"><Search /></div>
          <div className="header-icons">
            <ul className="icon-links">
              {user ? (
                <>
                  <li><Link to={user.role === 'admin' ? "/admin" : user.role === 'shopkeeper' ? "/shopkeeper" : "/"} className='nav-link'>Dashboard</Link></li>
                  <li><Button onClick={logout} className='nav-link' sx={{ textTransform: 'none', color: 'inherit', p: 0 }}>Logout</Button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className='nav-link'>Login</Link></li>
                  <li><Link to="/register" className='nav-link'>Register</Link></li>
                </>
              )}
              <li>
                <Tooltip title="Compare" >
                  <IconButton aria-label="compare">
                    <StyledBadge badgeContent={4} color="secondary">
                      <IoGitCompare />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Wishlist">
                  <IconButton aria-label="wishlist" component={Link} to="/wishlist">
                    <StyledBadge badgeContent={wishlist.length} color="secondary">
                      <FaRegHeart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Cart">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                      <ShoppingCartIcon />
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