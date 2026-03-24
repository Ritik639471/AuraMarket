import React from 'react';
import './style.css'
import { MdAccessTime } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom';

const BlogItem = () => {
    return (
        <div className="blog-item">
            <div className="img-wrapper">
                <img src="https://serviceapi.spicezgold.com/download/1750304462017_1000005912.jpg" className='blog-img'/>

                <span className='blog-time'>
                    <MdAccessTime className='blog-icon' /> 2025-03-12
                </span>
            </div>

            <div className='blog-content'>
                <Link className="link blog-link">
                    <h2 className='blog-title'>sustainable living through cutting-edge prefabricated homes</h2>
                </Link>
                <p className='blog-desc'>Give2 lady of they such they sure it....</p>

                <Link className="link read-more">
                Read More
                <MdArrowForwardIos className='blog-icon-arrow' />
                </Link>
            </div>

            
        </div>
        
    )
}

export default BlogItem;