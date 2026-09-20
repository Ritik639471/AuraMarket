import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button, Chip, Typography } from "@mui/material";
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useCompare } from "../../context/CompareContext";
import QuickViewModal from "../QuickViewModal";
import { FALLBACK_IMAGE } from "../ImageUpload";

const ProductItem = ({ product }) => {
  const [quickViewOpen, setQuickViewOpen] = React.useState(false);
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { compareList, toggleCompare } = useCompare();
  const navigate = useNavigate();

  if (!product) return null;

  const isInWishlist = wishlist.some(item => (item._id || item) === product._id);
  const isInCompare = compareList.some(item => (item._id || item) === product._id);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const ratingValue = product.rating || (product.reviews?.length ? product.reviews.reduce((a, b) => a + b.rating, 0) / product.reviews.length : 0);

  return (
    <div 
      className="group/card relative rounded-2xl overflow-hidden transition-all duration-300 ease-out bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/70 hover:border-red-200 dark:hover:border-red-500/50 hover:shadow-[0_12px_30px_rgba(255,82,82,0.14)] cursor-pointer h-full flex flex-col hover:-translate-y-1.5"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* Image Container with Luxury Subtle Gradient & Uncropped Object-Contain */}
      <div className="w-full relative overflow-hidden aspect-[4/5] bg-gradient-to-b from-slate-50 to-slate-100/60 dark:from-slate-800 dark:to-slate-900/60 flex items-center justify-center p-3.5">
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : FALLBACK_IMAGE}
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
          className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover/card:scale-108 drop-shadow-sm"
          alt={product.name}
          width="300"
          height="375"
          loading="lazy"
        />

        {/* Stock / Promotion Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isOutOfStock ? (
            <span className="bg-slate-800/90 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-sm">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="bg-amber-500/90 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-sm">
              Only {product.stock} Left!
            </span>
          ) : product.oldPrice && product.oldPrice > product.price ? (
            <span className="bg-[#ff5252] text-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-sm">
              Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          ) : (
            <span className="bg-[#ff5252]/90 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-sm">
              ★ Popular
            </span>
          )}
        </div>

        {/* Quick Action Buttons on Hover */}
        <div className="absolute -top-[200px] right-3 flex flex-col gap-2 transition-all duration-300 opacity-0 z-10 group-hover/card:top-3 group-hover/card:opacity-100">
          <Button 
            className="!w-9 !h-9 !min-w-9 !rounded-full !bg-white/90 !backdrop-blur-md hover:!bg-[#ff5252] !p-0 shadow-md transition-transform hover:scale-110"
            onClick={(e) => { e.stopPropagation(); setQuickViewOpen(true); }}
            title="Quick View"
          >
            <MdZoomOutMap className="text-[17px] text-slate-700 transition-colors duration-200 group-hover/card:hover:text-white" />
          </Button>
          <Button 
            className={`!w-9 !h-9 !min-w-9 !rounded-full !bg-white/90 !backdrop-blur-md hover:!bg-[#ff5252] !p-0 shadow-md transition-transform hover:scale-110 ${isInWishlist ? '!text-[#ff5252]' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id); showToast(isInWishlist ? 'Removed from Wishlist' : '❤️ Added to Wishlist', isInWishlist ? 'info' : 'success'); }}
            title="Wishlist"
          >
            {isInWishlist ? <FaHeart className="text-[16px] text-[#ff5252]" /> : <FaRegHeart className="text-[16px] text-slate-700" />}
          </Button>
          <Button 
            className={`!w-9 !h-9 !min-w-9 !rounded-full !bg-white/90 !backdrop-blur-md hover:!bg-[#ff5252] !p-0 shadow-md transition-transform hover:scale-110 ${isInCompare ? '!bg-[#ff5252] !text-white' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
            title="Compare"
          >
            <IoGitCompare className={`text-[16px] ${isInCompare ? 'text-white' : 'text-slate-700'}`} />
          </Button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-[#ff5252] transition-colors line-clamp-1">
          {product.category || 'Lifestyle'}
        </span>
        <h3 className="m-0 mt-1 font-semibold text-[14px] leading-snug text-slate-800 dark:text-slate-100 group-hover/card:text-[#ff5252] transition-colors line-clamp-2 min-h-[38px]">
          {product.name}
        </h3>

        {/* Dynamic Reviews & Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <Rating name="product-rating" value={ratingValue} precision={0.5} size="small" readOnly sx={{ fontSize: '16px' }} />
          <span className="text-[12px] font-medium text-slate-400">
            {ratingValue > 0 ? ratingValue.toFixed(1) : ''} ({product.numReviews || product.reviews?.length || 0})
          </span>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-auto pt-2.5 flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[#ff5252] text-[17px] font-black tracking-tight">${product.price}</span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-slate-400 text-xs line-through font-medium">${product.oldPrice}</span>
              )}
            </div>
            {product.discount ? (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-medium">In Stock</span>
            )}
          </div>

          <Button 
            variant="contained" 
            fullWidth
            disabled={isOutOfStock}
            sx={{
              backgroundColor: isOutOfStock ? '#94a3b8' : '#ff5252',
              '&:hover': { backgroundColor: isOutOfStock ? '#94a3b8' : '#e34e4e' },
              borderRadius: '9px',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '12px',
              py: 0.8,
              boxShadow: isOutOfStock ? 'none' : '0 2px 8px rgba(255,82,82,0.2)'
            }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
              showToast('🛒 Added to Cart!');
            }}
          >
            {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
          </Button>
        </div>
      </div>

      {quickViewOpen && <QuickViewModal open={quickViewOpen} handleClose={() => setQuickViewOpen(false)} product={product} />}
    </div>
  );
};

export default memo(ProductItem);
