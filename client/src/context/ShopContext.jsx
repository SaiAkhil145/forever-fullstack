/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  // ================== ADD TO CART ==================
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/add-cart`,
        { itemId, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Cart update failed");
    }
  };

  // ================== UPDATE QUANTITY ==================
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (!token) return;

    try {
      await axios.post(
        `${backendUrl}/api/cart/update-cart`,
        { itemId, size, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      toast.error("Failed to sync cart");
    }
  };

  // ================== GET CART COUNT ==================
  const getCartCount = () => {
    let total = 0;
    for (const product of Object.values(cartItems)) {
      for (const qty of Object.values(product)) {
        total += qty;
      }
    }
    return total;
  };

  // ================== GET PRODUCTS ==================
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/products`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  // ================== GET USER CART ==================
  const getUserCart = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${backendUrl}/api/cart/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      toast.error("Session expired. Please login again.");
      setToken("");
      navigate("/login");
    }
  };

  // ================== INITIAL LOAD ==================
  useEffect(() => {
    getProductsData();        // 🔥 this was missing
  }, []);

  // ================== TOKEN HANDLING ==================
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getUserCart();          // 🔥 reload cart on refresh/login
    } else {
      localStorage.removeItem("token");
      setCartItems({});
    }
  }, [token]);

  // ================== CONTEXT VALUE ==================
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    backendUrl,
    token,
    setToken,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
