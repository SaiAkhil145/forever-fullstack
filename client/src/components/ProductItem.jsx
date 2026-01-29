import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const [liked, setLiked] = useState(false);

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl">
      
      {/* Wishlist Button */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full 
        bg-white flex items-center justify-center shadow-sm border border-gray-200 
        hover:scale-110 transition"
      >
        <Heart
          size={16}
          className={`transition ${
            liked
              ? "fill-pink-600 text-pink-600"
              : "text-gray-400 hover:text-pink-600"
          }`}
        />
      </button>

      <Link to={`/product/${id}`} className="block">
        {/* Image Section */}
        <div className="relative w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-1">
          {/* Brand placeholder (Myntra style) */}
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Fashion Store
          </p>

          {/* Product Name */}
          <p className="text-sm text-gray-800 font-medium leading-snug line-clamp-2">
            {name}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-2 mt-1">
            <p className="text-base font-semibold text-gray-900">
              {currency}{price}
            </p>
            <p className="text-xs text-green-600 font-medium">
              (20% OFF)
            </p>
          </div>

          {/* Badge Row */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] px-2 py-[2px] rounded bg-gray-100 text-gray-600">
              New Arrival
            </span>
            <span className="text-[10px] text-gray-500">
              Free Delivery
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
