import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./index.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("jwt_token");
    try {
      const res = await fetch(
        "https://mernshoppingbackend-ygpp.onrender.com/api/orders/admin",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Fetch orders failed", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem("jwt_token");
    try {
      const res = await fetch(
        `https://mernshoppingbackend-ygpp.onrender.com/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (res.ok) {
        toast.success("Status Updated");
        // Optimistic UI Update
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, orderStatus: newStatus } : o,
          ),
        );
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="admin-content-wrapper">
      <h2 className="main-heading">Orders</h2>

      {/* DESKTOP TABLE VIEW */}
      <div className="desktop-table-view">
        <table className="products-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="order-id">
                  #{order._id.slice(-6).toUpperCase()}
                </td>
                <td>{order.user?.name || "Customer"}</td>
                <td>{order.orderItems?.length || 0} items</td>
                <td className="price-cell">
                  ₹{order.totalPrice.toLocaleString("en-IN")}
                </td>
                <td>
                  <span
                    className={`status-pill ${(order.orderStatus || "pending").toLowerCase()}`}
                  >
                    {order.orderStatus || "Pending"}
                  </span>
                </td>
                <td>
                  <select
                    className="status-dropdown"
                    value={order.orderStatus || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="mobile-orders-view">
        {orders.map((order) => (
          <div key={order._id} className="order-mobile-card">
            <div className="card-header">
              <span className="order-id">
                #{order._id.slice(-6).toUpperCase()}
              </span>
              <span
                className={`status-pill ${(order.orderStatus || "pending").toLowerCase()}`}
              >
                {order.orderStatus || "Pending"}
              </span>
            </div>

            <div className="card-body">
              <p>
                <strong>Customer:</strong> {order.user?.name || "Customer"}
              </p>
              <p>
                <strong>Items:</strong> {order.orderItems?.length || 0} items
              </p>
              <p>
                <strong>Total:</strong> ₹
                {order.totalPrice.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="card-actions">
              <label>Update Status:</label>
              <select
                className="status-dropdown"
                value={order.orderStatus || "Pending"}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
