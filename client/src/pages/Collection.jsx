/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { motion, AnimatePresence } from "framer-motion";

/* Animations */
const filterVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const productVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // Toggle category
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  // Toggle sub category
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  // Apply filters
  const applyFilter = () => {
    let productsCopy = [...products];

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilterProducts(productsCopy);
  };

  // Sort products
  const sortProduct = () => {
    let sortedProducts = [...filterProducts];

    switch (sortType) {
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }

    setFilterProducts(sortedProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filters Section */}
      <motion.div
        className="min-w-60"
        variants={filterVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 transition-transform ${
              showFilter ? "rotate-90" : ""
            }`}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-300 pl-5 py-3 mt-6 overflow-hidden"
            >
              <p className="mb-3 text-sm font-medium">Categories</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value="men"
                    onChange={toggleCategory}
                  />
                  Men
                </label>
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value="women"
                    onChange={toggleCategory}
                  />
                  Women
                </label>
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value="kids"
                    onChange={toggleCategory}
                  />
                  Kids
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sub Category Filter */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-300 pl-5 py-3 my-6 overflow-hidden"
            >
              <p className="mb-3 text-sm font-medium">Type</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value="topwear"
                    onChange={toggleSubCategory}
                  />
                  Topwear
                </label>
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value="bottomwear"
                    onChange={toggleSubCategory}
                  />
                  Bottomwear
                </label>
                <label className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value="winterwear"
                    onChange={toggleSubCategory}
                  />
                  Winterwear
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Right Section */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="flex justify-between text-base sm:text-2xl mb-4"
        >
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-2 py-1"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6"
        >
          <AnimatePresence>
            {filterProducts.map((item) => (
              <motion.div
                key={item._id}
                variants={productVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                exit="exit"
                transition={{ duration: 0.35 }}
                layout
              >
                <ProductItem
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Collection;
