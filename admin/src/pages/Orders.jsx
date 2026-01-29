/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.post(
          `${backendUrl}/api/order/list`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.log(error);
        alert("Failed to fetch admin orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [backendUrl, token]);

  // 🔥 Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        // Update UI instantly
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update order status");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading orders...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">All Orders (Admin)</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t text-sm hover:bg-gray-50"
              >
                <td className="p-3">{order._id}</td>
                <td className="p-3">{order.userId?.name || "N/A"}</td>
                <td className="p-3">{order.userId?.email || "N/A"}</td>
                <td className="p-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-xs text-gray-600">
                      {item._id?.name} × {item.quantity} ({item.size})
                    </div>
                  ))}
                </td>
                <td className="p-3 font-semibold">
                  ₹{Number(order.amount).toFixed(2)}
                </td>
                <td className="p-3">{order.paymentMethod}</td>

                {/* 🔥 Status with Select */}
                <td className="p-3">
                  <select
                    value={order.status || "Processing"}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded text-sm outline-none"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="p-3">
                  {new Date(order.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
