import React from 'react';
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturn } from "react-icons/pi";
import { LuWallet } from "react-icons/lu";
import { BsGift } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaFacebookF,FaInstagram ,FaTwitter ,FaPinterestP } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

import './style.css';
import { IoChatboxOutline } from 'react-icons/io5';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-top">
                        <div className="footer-col">
                            <LiaShippingFastSolid className='footer-icon' />
                            <h3 className='footer-title'>Free Shipping</h3>
                            <p className='footer-desc'>For all Orders Over $100</p>
                        </div>
                        <div className="footer-col">
                            <PiKeyReturn className='footer-icon' />
                            <h3 className='footer-title'>30 Days Returns</h3>
                            <p className='footer-desc'>For an Exchange Product</p>
                        </div>
                        <div className="footer-col">
                            <LuWallet className='footer-icon' />
                            <h3 className='footer-title'>Secured Payment</h3>
                            <p className='footer-desc'>Payment Cards Accepted</p>
                        </div>
                        <div className="footer-col">
                            <BsGift className='footer-icon' />
                            <h3 className='footer-title'>Special Gifts</h3>
                            <p className='footer-desc'>Our First Product Order</p>
                        </div>
                        <div className="footer-col">
                            <BiSupport className='footer-icon' />
                            <h3 className='footer-title'>Support 24/7</h3>
                            <p className='footer-desc'>Contact us Anytime</p>
                        </div>
                    </div>


                    <div className="footer-bottom">
                        <div className='footer-bottom-p1'>
                            <h2 className='footer-title' style={{ color: '#ff5252', fontWeight: 800 }}>AURA MARKET</h2>
                            <p className='footer-desc'>AuraMarket - Premium E-commerce Store<br />
                                123 Luxury Lane, Fashion Avenue, NY</p>
                            <Link className="link footer-desc" to="mailto:someone@example.com">
                                sales@yourcompany.com
                            </Link>
                            <span className='footer-contact-number'>(+91) 9876-543-210</span>

                            <div className='footer-chat-tab'>
                                <IoChatboxOutline className='footer-icon chat-icon' />
                                <span className='chat-title'>Online Chat<br /> Get Expert Help</span>
                            </div>
                        </div>

                        <div className='footer-bottom-p2'>
                            <div className="footer-p2-col1">
                                <h2 className='footer-p2-title'>Products</h2>
                                <ul className='footer-p2-list'>
                                    <li className='footer-p2-item'>
                                        <Link to="" className='link footer-p2-link'>Prices drop</Link>
                                    </li>
                                    <li className='footer-p2-item'>
                                        <Link to="" className='link footer-p2-link'>New products</Link>
                                    </li>
                                    <li className='footer-p2-item'>
                                        <Link to="" className='link footer-p2-link'>Best sales</Link>
                                    </li>
                                    <li className='footer-p2-item'>
                                        <Link to="" className='link footer-p2-link'>Contact us</Link>
                                    </li>
                                    <li className='footer-p2-item '>
                                        <Link to="" className='link footer-p2-link'>Sitemap</Link>
                                    </li>
                                    <li className='footer-p2-item'>
                                        <Link to="" className='link footer-p2-link'>Stores</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="footer-p2-col2">
                                <h2 className='footer-p2-title'>Our company</h2>
                                <ul className='footer-p2-list'>
                                    <li className='footer-p2-item'>
                                        <Link to="" className='link footer-p2-link'>Delivery</Link>
                                    </li>
                                    <li className='footer-p2-item'>
                                        <Link to="" className='link footer-p2-link'>Legal Notice</Link>
                                    </li>
                                    <li className='footer-p2-item'>
                                        <Link to="" className='link footer-p2-link'>Terms and conditions of use</Link>
                                    </li>
                                    <li className='footer-p2-item'>
                                        <Link to="" className='link footer-p2-link'>About us</Link>
                                    </li>
                                    <li className='footer-p2-item '>
                                        <Link to="" className='link footer-p2-link'>Secure payment</Link>
                                    </li>
                                    <li className='footer-p2-item'>
                                        <Link to="" className='link footer-p2-link'>Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className='footer-bottom-p3'>
                            <h2 className='footer-p2-title'>Subscibe to Newsletter</h2>
                            <p className="footer-desc">Subscribe to our latest newsletter to get news about special discounts.</p>

                            <form className='newslater-form'>
                                <input type="text" className='newslater-input' placeholder='Enter your email' />
                                <Button className='btn' variant="contained">Subscribe</Button>
                            </form>

                            <FormControlLabel control={<Checkbox />} label="I agree to the terms and conditions and the privacy policy" />
                        </div>
                    </div>
                </div>
            </footer>

            <div className="bottom-strip">
                <div className="bottom-container">
                    <ul className="social-links-list">
                        <li className="list-item">
                            <Link to="/" target="_blank" className="social-link">
                                <FaFacebookF className="social-icon" />
                            </Link>
                        </li>
                        <li className="list-item">
                            <Link to="/" target="_blank" className="social-link">
                                <FiYoutube className="social-icon" />
                            </Link>
                        </li>
                        <li className="list-item">
                            <Link to="/" target="_blank" className="social-link">
                                <FaPinterestP className="social-icon" />
                            </Link>
                        </li>
                        <li className="list-item">
                            <Link to="/" target="_blank" className="social-link">
                                <FaInstagram className="social-icon" />
                            </Link>
                        </li>
                        <li className="list-item">
                            <Link to="/" target="_blank" className="social-link">
                                <FaTwitter className="social-icon" />
                            </Link>
                        </li>
                    </ul>

                    <p className='right-text'>© 2024 - AuraMarket. All rights reserved.</p>

                    <div className='card-supported'>
                        <img src="/image/card1.png" alt="image" className="card-img" />
                        <img src="/image/card2.png" alt="image" className="card-img"/>
                        <img src="/image/card3.png" alt="image" className="card-img"/>
                        <img src="/image/card4.png" alt="image" className="card-img"/>
                        <img src="/image/card5.png" alt="image" className="card-img"/> 
                    </div>
                </div>
            </div>
        </>
    )

}

export default Footer;