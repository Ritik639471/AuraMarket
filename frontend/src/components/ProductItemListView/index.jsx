import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useCompare } from "../../context/CompareContext";
import QuickViewModal from "../QuickViewModal";
import { FALLBACK_IMAGE } from "../ImageUpload";

const ProductItemListView = ({ product }) => {
  const [quickViewOpen, setQuickViewOpen] = React.useState(false);
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { compareList, toggleCompare } = useCompare();
  if (!product) return null;

  const isInWishlist = wishlist.some(item => (item._id || item) === product._id);
  const isInCompare = compareList.some(item => (item._id || item) === product._id);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const ratingValue = product.rating || (product.reviews?.length ? product.reviews.reduce((a, b) => a + b.rating, 0) / product.reviews.length : 0);

  const navigate = useNavigate();

  return (
    <div
      className="shadow-[0_4px_10px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden transition-all duration-300 ease-in-out bg-white flex group/item cursor-pointer border border-slate-100 hover:border-red-200"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="w-[36%] relative rounded-l-lg overflow-hidden group/img bg-slate-50 flex items-center justify-center">
        <div className="block h-[262px] w-full relative overflow-hidden">
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : FALLBACK_IMAGE}
            onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
            alt={product.name}
            width="262"
            height="262"
            loading="lazy"
          />
        </div>
        <span className="absolute top-[10px] left-[10px] bg-[#ff5252] text-white py-[4px] px-[10px] text-[11px] font-bold uppercase rounded-md z-10">New</span>

        <div className="absolute -top-[200px] right-[5px] flex flex-col gap-2 transition-all duration-300 opacity-0 z-10 group-hover/img:top-[15px] group-hover/img:opacity-100">
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-[#ff5252] !p-0 group/btn shadow-sm"
            onClick={(e) => { e.stopPropagation(); setQuickViewOpen(true); }}
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
            className={`!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-[#ff5252] !p-0 group/btn shadow-sm ${isInCompare ? '!bg-[#ff5252]' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
          >
            <IoGitCompare className={`text-[18px] transition-colors duration-300 group-hover/btn:text-white pointer-events-none ${isInCompare ? 'text-white' : 'text-black'}`} />
          </Button>
        </div>
      </div>

      <div className="p-0 ml-[25px] flex flex-col justify-center w-[64%]">
        <h6 className="mt-2.5 mb-1 p-0">
          <span className="text-[16px] font-medium !text-[#3e3e3e] m-0 p-0 hover:!text-[#ff5252] no-underline">{product.category}</span>
        </h6>
        <h3 className="m-0 p-0">
          <span className="text-[18px] font-[550] !text-black hover:!text-[#ff5252] no-underline">
            {product.name}
          </span>
        </h3>

        <h3 style={{ fontSize: '14px', fontWeight: '400', color: 'rgba(15, 14, 14, 0.67)' }}>
          {product.description}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Rating name="size-medium" value={ratingValue} precision={0.5} size="small" readOnly />
          <span className="text-[12px] font-medium text-slate-400">
            {ratingValue > 0 ? ratingValue.toFixed(1) : ''} ({product.numReviews || product.reviews?.length || 0})
          </span>
        </div>
        <div className="flex items-center gap-[10px] mt-2">
          <span className="text-[#ff5252] text-[20px] font-bold">${product.price}</span>
        </div>

        <Button
          className="!mt-4 !bg-[#ff5252] hover:!bg-[#e34e4e] !text-white !font-bold !py-2 !px-4 !rounded-lg !w-fit"
          disabled={isOutOfStock}
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
        >
          <BsCart3 className="text-[20px] font-bold mr-2" />
          {isOutOfStock ? 'Sold Out' : 'Add To Cart'}
        </Button>
        {quickViewOpen && <QuickViewModal open={quickViewOpen} handleClose={() => setQuickViewOpen(false)} product={product} />}
      </div>
    </div>
  );
};

export default memo(ProductItemListView);
