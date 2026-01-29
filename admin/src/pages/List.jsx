/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const adminToken = localStorage.getItem("token");

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/products`);

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // DELETE PRODUCT
  // DELETE PRODUCT
const deleteProduct = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );
  if (!confirmDelete) return;

  try {
    const res = await axios.post(
      `${backendUrl}/api/product/remove`,
      { id }, // send id in body
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    if (res.data.success) {
      toast.success("Product deleted successfully");

      // Remove from UI
      setList((prev) => prev.filter((item) => item._id !== id));
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message || "Failed to delete product"
    );
  }
};


  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Product List
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Sub Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Sizes</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-800">
                    {item.name}
                  </td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.subCategory}</td>
                  <td className="p-3">₹{item.price}</td>
                  <td className="p-3">
                    <div className="flex gap-1 flex-wrap">
                      {item.sizes.map((size, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-200 px-2 py-1 rounded"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      className="text-red-600 hover:underline text-sm"
                      onClick={() => deleteProduct(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default List;
