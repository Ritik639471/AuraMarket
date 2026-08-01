import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const ProductItem = ({ product }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  if (!product) return null;

  const isInWishlist = wishlist.some(item => (item._id || item) === product._id);

  const navigate = useNavigate();

  return (
    <div 
      className="shadow-[0_4px_10px_rgba(0,0,0,0.15)] rounded-lg overflow-hidden transition-all duration-300 ease-in-out bg-white group/item pb-2 cursor-pointer h-full flex flex-col"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="w-full relative rounded-t-lg overflow-hidden group/img aspect-[4/5] bg-gray-100 flex items-center justify-center">
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/230x230?text=No+Image'}
          className="w-full h-full object-cover"
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
        <span className="absolute top-2.5 left-2.5 bg-[#ff5252] text-white py-1 px-2.5 text-[12px] font-medium rounded-md z-10">New</span>

        <div className="absolute -top-[200px] right-[5px] flex flex-col gap-2 transition-all duration-300 opacity-0 z-10 group-hover/img:top-[15px] group-hover/img:opacity-100">
          <Button 
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-[#ff5252] !p-0 group/btn shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <MdZoomOutMap className="text-[18px] text-black transition-colors duration-300 group-hover/btn:text-white pointer-events-none" />
          </Button>
          <Button 
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-[#ff5252] !p-0 group/btn shadow-sm" 
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id); }}
          >
            <FaRegHeart className={`text-[18px] transition-colors duration-300 group-hover/btn:text-white pointer-events-none ${isInWishlist ? '!text-[#ff5252]' : 'text-black'}`} />
          </Button>
          <Button 
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-[#ff5252] !p-0 group/btn shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <IoGitCompare className="text-[18px] text-black transition-colors duration-300 group-hover/btn:text-white pointer-events-none" />
          </Button>
        </div>
      </div>

      <div className="px-4 mt-2 flex flex-col flex-grow">
        <h6 className="m-0 p-0">
          <span className="text-[13px] font-medium !text-[#3e3e3e] m-0 p-0 hover:!text-[#ff5252] no-underline">{product.category}</span>
        </h6>
        <h3 className="m-0 p-0 mt-1 line-clamp-2 min-h-[40px]">
          <span className="text-[13px] font-[550] !text-black hover:!text-[#ff5252] no-underline">
            {product.name}
          </span>
        </h3>
        <Rating name="size-small" defaultValue={4} size="small" readOnly sx={{ mt: 0.5 }} />
        <div className="flex items-center gap-2.5 mt-auto mb-1">
          <span className="text-[#ff5252] text-[15px] font-semibold">${product.price}</span>
        </div>
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mt: 1, backgroundColor: '#ff5252', '&:hover': { backgroundColor: '#e34e4e' } }}
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
