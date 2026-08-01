import React from 'react';
import { MdAccessTime } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom';

const BlogItem = () => {
    return (
        <div className="shadow-[0_4px_10px_rgba(0,0,0,0.15)] rounded-lg overflow-hidden transition-all duration-300 ease-in-out bg-white m-2.5 group/blog">
            <div className="cursor-pointer relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&q=80" className='w-full h-auto block transition-transform duration-400 ease-in-out group-hover/blog:scale-105 group-hover/blog:rotate-2' loading="lazy" decoding="async"/>

                <span className='flex items-center justify-center absolute bottom-3 right-3 text-white bg-[#ff5252] py-[1px] px-[5px] rounded-[5px] text-[13px] gap-[5px]'>
                    <MdAccessTime className='text-[16px]' /> 2025-03-12
                </span>
            </div>

            <div className='pb-3'>
                <Link to="/" className="text-black no-underline font-medium hover:!text-[#ff5252]">
                    <h2 className='!text-[15px] !font-medium ml-2 mt-2'>sustainable living through cutting-edge prefabricated homes</h2>
                </Link>
                <p className='text-[rgb(89,84,84)] !text-[14px] ml-2.5 mb-2 mt-1'>Give2 lady of they such they sure it....</p>

                <Link to="/" className="flex items-center ml-2.5 !text-[rgb(99,98,98)] gap-[5px] hover:!text-[#ff5252] no-underline">
                Read More
                <MdArrowForwardIos className='text-[13px]' />
                </Link>
            </div>

            
        </div>
        
    )
}

export default BlogItem;