/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const {
    cartItems,
    products,
    getCartCount,
    token,
    backendUrl,
    currency,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("COD");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* -------- BUILD CART DATA -------- */
  const cartData = [];
  if (cartItems && typeof cartItems === "object") {
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          cartData.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
  }

  /* -------- CALCULATE TOTAL -------- */
  const subTotal = cartData.reduce((total, item) => {
    const product = products.find((p) => p._id === item._id);
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);

  const shippingFee = subTotal > 0 ? 10 : 0;
  const total = subTotal + shippingFee;

  /* -------- PLACE ORDER -------- */
  const placeOrderHandler = async () => {
    try {
      if (!token) {
        alert("Please login first");
        return;
      }

      if (cartData.length === 0) {
        alert("Your cart is empty");
        return;
      }

      // Stripe needs full product info
      const stripeItems = cartData.map((item) => {
        const product = products.find((p) => p._id === item._id);
        return {
          _id: item._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          size: item.size,
        };
      });

      const orderData = {
        items: method === "Stripe" ? stripeItems : cartData,
        amount: total,
        address: formData,
      };

      let endpoint = "/api/order/place";
      if (method === "Stripe") endpoint = "/api/order/stripe";
      if (method === "Razorpay") endpoint = "/api/order/razorpay";

      const res = await axios.post(
        `${backendUrl}${endpoint}`,
        orderData,
        {
          headers: {
            token,
          },
        }
      );

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      // 🔥 Stripe redirect
      if (method === "Stripe") {
        window.location.href = res.data.session_url;
      } 
      // COD success
      else {
        alert("Order placed successfully (Cash on Delivery)");
      }

    } catch (error) {
      console.log(error);
      alert("Order failed. Check console.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* DELIVERY INFO */}
        <div>
          <h2 className="text-lg font-semibold tracking-wide mb-6 border-b pb-2">
            DELIVERY INFORMATION
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First name"
              onChange={handleChange}
              className="input-style"
            />
            <input
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
              className="input-style"
            />
          </div>

          <input
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            className="input-style mt-4"
          />
          <input
            name="street"
            placeholder="Street"
            onChange={handleChange}
            className="input-style mt-4"
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="input-style"
            />
            <input
              name="state"
              placeholder="State"
              onChange={handleChange}
              className="input-style"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              name="zipcode"
              placeholder="Zipcode"
              onChange={handleChange}
              className="input-style"
            />
            <input
              name="country"
              placeholder="Country"
              onChange={handleChange}
              className="input-style"
            />
          </div>

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="input-style mt-4"
          />
        </div>

        {/* CART TOTALS */}
        <div>
          <h2 className="text-lg font-semibold tracking-wide mb-6 border-b pb-2">
            CART TOTALS
          </h2>

          <div className="flex justify-between text-sm mb-3">
            <p>Subtotal ({getCartCount()} items)</p>
            <p>
              {currency}
              {subTotal.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between text-sm mb-3">
            <p>Shipping Fee</p>
            <p>
              {currency}
              {shippingFee.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between text-base font-semibold border-t pt-3">
            <p>Total</p>
            <p>
              {currency}
              {total.toFixed(2)}
            </p>
          </div>

          {/* PAYMENT METHOD */}
          <h2 className="text-lg font-semibold tracking-wide mt-10 mb-4 border-b pb-2">
            PAYMENT METHOD
          </h2>

          <div className="flex gap-4">
            {["Stripe", "COD"].map((item) => (
              <button
                key={item}
                onClick={() => setMethod(item)}
                className={`flex-1 border py-3 text-sm uppercase tracking-wide transition ${
                  method === item
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                {item === "COD" ? "Cash on Delivery" : item}
              </button>
            ))}
          </div>

          <button
            onClick={placeOrderHandler}
            className="w-full bg-black text-white py-4 mt-8 uppercase tracking-wide hover:opacity-90 transition"
          >
            Place Order
          </button>
        </div>
      </div>

      <style>
        {`
          .input-style{
            width:100%;
            border:1px solid #d1d5db;
            padding:10px 12px;
            font-size:14px;
            outline:none;
            transition:0.2s;
          }
          .input-style:focus{
            border-color:black;
          }
        `}
      </style>
    </div>
  );
};

export default PlaceOrder;
