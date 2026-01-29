/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { currency, token, backendUrl, products } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.post(
          `${backendUrl}/api/order/userorders`,
          {},
          {
            headers: { token },
          }
        );

        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.log(error);
        alert("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token, backendUrl]);

  return (
    <div className="border-t pt-12 px-6 lg:px-24 bg-gray-50 min-h-screen">
      {/* Title */}
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {loading ? (
        <p className="text-center py-10 text-gray-500">
          Loading your orders...
        </p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          You have not placed any orders yet 📦
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) =>
            order.items.map((item, idx) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;

              return (
                <div
                  key={`${order._id}-${idx}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 border rounded-md shadow-sm hover:shadow-md transition"
                >
                  {/* LEFT : IMAGE + INFO */}
                  <div className="flex gap-5 items-start">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded-md border"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-700 mt-1">
                        {currency}
                        {product.price} &nbsp; | &nbsp; Quantity:{" "}
                        {item.quantity} &nbsp; | &nbsp; Size: {item.size}
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        Date:{" "}
                        {new Date(order.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>

                      <p className="text-xs text-gray-400">
                        Payment: {order.paymentMethod || "COD"}
                      </p>
                    </div>
                  </div>

                  {/* CENTER : STATUS */}
                  <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Processing"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {order.status || "Processing"}
                    </span>
                  </div>

                  {/* RIGHT : TRACK BUTTON */}
                  <button className="mt-4 sm:mt-0 border px-5 py-2 text-sm rounded-md hover:bg-black hover:text-white transition">
                    Track Order
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
