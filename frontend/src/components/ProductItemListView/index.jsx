import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import "./style.css";

const ProductItemListView = ({ product }) => {
  if (!product) return null;

  return (
    <div className="list-view product-list-item">
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
          <Button className="icon-btn">
            <FaRegHeart className="icon" />
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

        <h3 style={{ fontSize: '14px', fontWeight: '400', color: 'rgba(15, 14, 14, 0.67)' }}>
          {product.description}
        </h3>
        <Rating name="size-medium" defaultValue={4} size="small" readOnly />
        <div className="product-price">
          <span className="prod-new-price">${product.price}</span>
        </div>

        <Button className="btn" style={{ marginBottom: '10px' }}>
          <BsCart3 style={{ fontSize: '22px', fontWeight: '700', marginRight: '10px' }} />
          Add To Cart
        </Button>

      </div>
    </div>
  );
};

export default ProductItemListView;
