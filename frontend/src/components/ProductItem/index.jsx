import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";
import "./style.css";
import { useWishlist } from "../../context/WishlistContext";

const ProductItem = ({ product }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  if (!product) return null;

  const isInWishlist = wishlist.some(item => (item._id || item) === product._id);

  return (
    <div className="product-item">
      <div className="img-wrapper">
        <Link to={`/product/${product._id}`}>
          <div className="img-container">
            <img
              src={product.image}
              className="img-primary"
              alt={product.name}
            />
          </div>
        </Link>
        <span className="prod-discount">New</span>

        <div className="prod-actions">
          <Button className="icon-btn">
            <MdZoomOutMap className="icon" />
          </Button>
          <Button className="icon-btn" onClick={() => toggleWishlist(product._id)}>
            <FaRegHeart className={`icon ${isInWishlist ? 'active' : ''}`} style={{ color: isInWishlist ? '#ff5252' : 'inherit' }} />
          </Button>
          <Button className="icon-btn">
            <IoGitCompare className="icon" />
          </Button>
        </div>
      </div>

      <div className="product-desc">
        <h6 className="brand-name">
          <Link to="/" className="link brand-link">{product.category}</Link>
        </h6>
        <h3 className="product-name">
          <Link to={`/product/${product._id}`} className="link prod-link">
            {product.name}
          </Link>
        </h3>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <div className="product-price">
          <span className="prod-new-price">${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
