/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {
    products,
    cartItems,
    currency,
    updateQuantity,
    removeFromCart,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); // percentage discount

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // Calculate cart total
  const getTotalAmount = () => {
    return cartData.reduce((total, item) => {
      const productData = products.find(
        (product) => product._id === item._id
      );
      return total + productData.price * item.quantity;
    }, 0);
  };

  // Apply coupon logic (demo)
  const applyCoupon = () => {
    if (couponCode === "SAVE10") {
      setDiscount(10);
      alert("Coupon applied! You got 10% off 🎉");
    } else if (couponCode === "SAVE20") {
      setDiscount(20);
      alert("Coupon applied! You got 20% off 🎉");
    } else {
      setDiscount(0);
      alert("Invalid Coupon Code ❌");
    }
  };

  const totalAmount = getTotalAmount();
  const discountAmount = (totalAmount * discount) / 100;
  const finalAmount = totalAmount - discountAmount;

  return (
    <div className="border-t pt-14 px-4 sm:px-8 lg:px-20">
      {/* Title */}
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Your cart is empty 🛒
          </p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_1fr_1fr_0.5fr] items-center gap-4"
              >
                {/* Product Info */}
                <div className="flex items-start gap-6">
                  <img
                    src={productData.image[0]}
                    alt={productData.name}
                    className="w-16 sm:w-20 rounded"
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity - 1)
                    }
                    className="px-2 border rounded"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity + 1)
                    }
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p className="text-center font-medium">
                  {currency}
                  {(productData.price * item.quantity).toFixed(2)}
                </p>

                {/* Remove Product */}
                <button
                  onClick={() => updateQuantity(item._id, item.size,0)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg"
                  title="Remove item"
                >
                  <img src={assets.bin_icon} className="w-4" alt="" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Coupon Section */}
      {cartData.length > 0 && (
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 border p-4 rounded">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border px-4 py-2 rounded w-full sm:w-1/3"
          />
          <button
            onClick={applyCoupon}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Apply Coupon
          </button>
        </div>
      )}

      {/* Cart Summary */}
      {cartData.length > 0 && (
        <div className="mt-10 border-t pt-6 space-y-3 max-w-md ml-auto">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {currency}
              {totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between text-green-600">
            <p>Discount ({discount}%)</p>
            <p>
              - {currency}
              {discountAmount.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between text-lg font-semibold">
            <p>Total</p>
            <p>
              {currency}
              {finalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Buttons */}
      {cartData.length > 0 && (
        <div className="flex justify-end gap-4 mt-6">
          <button className="border border-black px-6 py-2 rounded hover:bg-gray-100 transition" onClick={()=>navigate('/collection')}>
            Continue Shopping
          </button>
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition" onClick={()=>navigate('/place-order')}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

