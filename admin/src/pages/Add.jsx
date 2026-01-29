import React, { useState } from "react";
import assets from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = () => {
  const [images, setImages] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("men");
  const [subCategory, setSubCategory] = useState("topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);

  // Image handler
  const handleImageChange = (e, num) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages((prev) => ({
      ...prev,
      [`image${num}`]: {
        file,
        preview: URL.createObjectURL(file),
      },
    }));
  };

  // Size toggle
  const handleSizeChange = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  // Submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || sizes.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // Images
      Object.keys(images).forEach((key) => {
        formData.append(key, images[key].file);
      });

      // Fields
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestSeller", bestSeller.toString());

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${backendUrl}/api/product/add-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Product added successfully");

        // Reset
        setImages({});
        setName("");
        setDescription("");
        setCategory("men");
        setSubCategory("topwear");
        setPrice("");
        setSizes([]);
        setBestSeller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to add product, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Product
      </h2>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Upload Images */}
        <div>
          <p className="font-medium mb-2">Upload Images</p>
          <div className="flex gap-4 flex-wrap">
            {[1, 2, 3, 4].map((num) => (
              <label
                key={num}
                htmlFor={`image${num}`}
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-black transition overflow-hidden"
              >
                {images[`image${num}`]?.preview ? (
                  <img
                    src={images[`image${num}`].preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={assets.upload_area}
                    alt="upload"
                    className="w-10 opacity-70"
                  />
                )}

                <input
                  type="file"
                  id={`image${num}`}
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, num)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <p className="font-medium mb-1">Product Name</p>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-black/70"
          />
        </div>

        {/* Description */}
        <div>
          <p className="font-medium mb-1">Product Description</p>
          <textarea
            rows="4"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-black/70"
          />
        </div>

        {/* Category, SubCategory, Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-medium mb-1">Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black/70"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="font-medium mb-1">Sub Category</p>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black/70"
            >
              <option value="topwear">Topwear</option>
              <option value="bottomwear">Bottomwear</option>
              <option value="kidswear">Kidswear</option>
            </select>
          </div>

          <div>
            <p className="font-medium mb-1">Price</p>
            <input
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-black/70"
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="font-medium mb-2">Product Sizes</p>
          <div className="flex flex-wrap gap-3">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <label
                key={size}
                className={`flex items-center gap-2 border px-3 py-2 rounded-md cursor-pointer transition ${
                  sizes.includes(size)
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                <input
                  type="checkbox"
                  checked={sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className="hidden"
                />
                <span className="text-sm font-medium">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bestseller Toggle */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
          <div>
            <p className="font-medium text-gray-800">Mark as Bestseller</p>
            <p className="text-sm text-gray-500">
              Highlight this product as featured
            </p>
          </div>

          <button
            type="button"
            onClick={() => setBestSeller(!bestSeller)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              bestSeller ? "bg-black" : "bg-gray-300"
            }`}
          >
            <span
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                bestSeller ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-md text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:opacity-90"
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
