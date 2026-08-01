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
import { IoChatboxOutline } from 'react-icons/io5';

const Footer = () => {
    return (
        <>
            <footer className="bg-[#fafafa]">
                <div className="container mx-auto max-w-[1300px]">
                    <div className="flex items-center justify-center gap-4 pt-8 pb-12 border-b border-[#d5d7da]">
                        <div className="w-[15%] flex flex-col items-center justify-center group cursor-pointer">
                            <LiaShippingFastSolid className='text-[40px] text-black transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-1' />
                            <h3 className='text-black text-lg font-semibold mt-2'>Free Shipping</h3>
                            <p className='text-[13px] font-medium text-[#6a6464] m-0'>For all Orders Over $100</p>
                        </div>
                        <div className="w-[15%] flex flex-col items-center justify-center group cursor-pointer">
                            <PiKeyReturn className='text-[40px] text-black transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-1' />
                            <h3 className='text-black text-lg font-semibold mt-2'>30 Days Returns</h3>
                            <p className='text-[13px] font-medium text-[#6a6464] m-0'>For an Exchange Product</p>
                        </div>
                        <div className="w-[15%] flex flex-col items-center justify-center group cursor-pointer">
                            <LuWallet className='text-[40px] text-black transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-1' />
                            <h3 className='text-black text-lg font-semibold mt-2'>Secured Payment</h3>
                            <p className='text-[13px] font-medium text-[#6a6464] m-0'>Payment Cards Accepted</p>
                        </div>
                        <div className="w-[15%] flex flex-col items-center justify-center group cursor-pointer">
                            <BsGift className='text-[40px] text-black transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-1' />
                            <h3 className='text-black text-lg font-semibold mt-2'>Special Gifts</h3>
                            <p className='text-[13px] font-medium text-[#6a6464] m-0'>Our First Product Order</p>
                        </div>
                        <div className="w-[15%] flex flex-col items-center justify-center group cursor-pointer">
                            <BiSupport className='text-[40px] text-black transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-1' />
                            <h3 className='text-black text-lg font-semibold mt-2'>Support 24/7</h3>
                            <p className='text-[13px] font-medium text-[#6a6464] m-0'>Contact us Anytime</p>
                        </div>
                    </div>


                    <div className="flex items-start pt-8 px-5 pb-8">
                        <div className='w-1/4 flex flex-col gap-4'>
                            <h2 className='text-[#ff5252] text-[19px] font-extrabold m-0'>AURA MARKET</h2>
                            <p className='text-[13px] font-medium text-[#6a6464] m-0'>AuraMarket - Premium E-commerce Store<br />
                                123 Luxury Lane, Fashion Avenue, NY</p>
                            <Link className="text-[13px] font-medium text-[#6a6464] no-underline hover:text-blue-600 transition-colors" to="mailto:someone@example.com">
                                sales@yourcompany.com
                            </Link>
                            <span className='text-[22px] font-semibold text-[#ff5252] block mb-5'>(+91) 9876-543-210</span>

                            <div className='flex items-center gap-2'>
                                <IoChatboxOutline className='text-[40px] text-[#ff5252]' />
                                <span className='text-lg font-semibold'>Online Chat<br /> Get Expert Help</span>
                            </div>
                        </div>

                        <div className='w-2/5 flex pl-8'>
                            <div className="w-1/2">
                                <h2 className='text-[20px] font-semibold mt-0 mb-4'>Products</h2>
                                <ul className='p-0 m-0'>
                                    <li className='list-none mb-2 w-full'>
                                        <Link to="/products" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>Prices drop</Link>
                                    </li>
                                    <li className='list-none mb-2 w-full'>
                                        <Link to="/products" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>New products</Link>
                                    </li>
                                    <li className='list-none mb-2 w-full'>
                                        <Link to="/products" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>Best sales</Link>
                                    </li>
                                    <li className='list-none mb-2 w-full'>
                                        <Link to="/" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>Contact us</Link>
                                    </li>
                                    <li className='list-none mb-2 w-full '>
                                        <Link to="/" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>Sitemap</Link>
                                    </li>
                                    <li className='list-none mb-2 w-full'>
                                        <Link to="/products" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>Stores</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="w-1/2">
                                <h2 className='text-[20px] font-semibold mt-0 mb-4'>Our company</h2>
                                <ul className='p-0 m-0'>
                                    <li className='list-none mb-2 w-full'>
                                        <Link to="/" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>Delivery</Link>
                                    </li>
                                    <li className='list-none mb-2 w-full'>
                                        <Link to="/" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>Legal Notice</Link>
                                    </li>
                                    <li className='list-none mb-2 w-full'>
                                        <Link to="/" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>Terms and conditions of use</Link>
                                    </li>
                                    <li className='list-none mb-2 w-full'>
                                        <Link to="/" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>About us</Link>
                                    </li>
                                    <li className='list-none mb-2 w-full '>
                                        <Link to="/" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>Secure payment</Link>
                                    </li>
                                    <li className='list-none mb-2 w-full'>
                                        <Link to="/login" className='text-[14px] font-normal text-[#6a6464] no-underline hover:text-blue-600 transition-colors'>Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className='w-[35%] flex flex-col px-8'>
                            <h2 className='text-[20px] font-semibold mt-0 mb-4'>Subscribe to Newsletter</h2>
                            <p className="text-[13px] font-medium text-[#6a6464] m-0 mb-4">Subscribe to our latest newsletter to get news about special discounts.</p>

                            <form className='mt-5 flex gap-2'>
                                <input type="text" className='flex-1 h-[45px] border border-gray-200 outline-none px-4 rounded-md text-[14px] text-gray-900 focus:border-gray-500 transition-colors' placeholder='Enter your email' />
                                <Button className='text-base px-5 py-[7px] font-medium bg-[#1976d2] hover:bg-[#c00404]' sx={{color: 'white', textTransform: 'none'}} variant="contained">Subscribe</Button>
                            </form>

                            <div className="mt-4">
                                <FormControlLabel sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px', color: 'rgba(0,0,0,0.8)' } }} control={<Checkbox sx={{ '&.Mui-checked': { color: '#ff5252' } }} />} label="I agree to the terms and conditions and the privacy policy" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="border-t border-black/10 py-3 bg-white">
                <div className="container mx-auto max-w-[1300px] flex items-center justify-between px-4">
                    <ul className="flex items-center gap-2 m-0 p-0">
                        <li className="list-none">
                            <Link to="/" target="_blank" className="w-[35px] h-[35px] rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-[#ff5252] hover:text-white transition-all duration-300 group">
                                <FaFacebookF className="text-[22px] transition-colors duration-300 group-hover:text-white" />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link to="/" target="_blank" className="w-[35px] h-[35px] rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-[#ff5252] hover:text-white transition-all duration-300 group">
                                <FiYoutube className="text-[22px] transition-colors duration-300 group-hover:text-white" />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link to="/" target="_blank" className="w-[35px] h-[35px] rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-[#ff5252] hover:text-white transition-all duration-300 group">
                                <FaPinterestP className="text-[22px] transition-colors duration-300 group-hover:text-white" />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link to="/" target="_blank" className="w-[35px] h-[35px] rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-[#ff5252] hover:text-white transition-all duration-300 group">
                                <FaInstagram className="text-[22px] transition-colors duration-300 group-hover:text-white" />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link to="/" target="_blank" className="w-[35px] h-[35px] rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-[#ff5252] hover:text-white transition-all duration-300 group">
                                <FaTwitter className="text-[22px] transition-colors duration-300 group-hover:text-white" />
                            </Link>
                        </li>
                    </ul>

                    <p className='text-[13px] text-center mb-0'>© 2024 - AuraMarket. All rights reserved.</p>

                    <div className='flex items-center gap-1'>
                        <img src="/image/card1.png" alt="image" className="h-[25px]" />
                        <img src="/image/card2.png" alt="image" className="h-[25px]"/>
                        <img src="/image/card3.png" alt="image" className="h-[25px]"/>
                        <img src="/image/card4.png" alt="image" className="h-[25px]"/>
                        <img src="/image/card5.png" alt="image" className="h-[25px]"/> 
                    </div>
                </div>
            </div>
        </>
    )

}

export default Footer;