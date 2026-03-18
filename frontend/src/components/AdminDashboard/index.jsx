import { useEffect, useState } from "react";
import { FaBox, FaShoppingCart, FaDollarSign, FaUsers } from "react-icons/fa";
import "./index.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    users: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("jwt_token");
      try {
        // Fetching Stats
        const statsRes = await fetch(
          "https://mernshoppingbackend-ygpp.onrender.com/api/admin/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const statsData = await statsRes.json();
        setStats(statsData);

        // Fetching Recent Orders using your existing admin order route
        const ordersRes = await fetch(
          "https://mernshoppingbackend-ygpp.onrender.com/api/orders/admin",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const ordersData = await ordersRes.json();
        // Just take the latest 5 orders
        setRecentOrders(ordersData.slice(0, 5));
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="loader">Loading Dashboard...</div>;
  }

  return (
    <div className="admin-dashboard-wrapper">
      <h1 className="main-heading">Dashboard</h1>

      {/* Stat Cards Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon-container orange">
            <FaBox />
          </div>
          <div className="stat-info">
            <h2>{stats.products}</h2>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-container blue">
            <FaShoppingCart />
          </div>
          <div className="stat-info">
            <h2>{stats.orders}</h2>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-container green">
            <FaDollarSign />
          </div>
          <div className="stat-info">
            <h2>₹{stats.revenue.toLocaleString()}</h2>
            <p>Revenue</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-container purple">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h2>{stats.users}</h2>
            <p>Customers</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="recent-orders-card">
        <h3>Recent Orders</h3>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order._id}>
                <td className="order-id">
                  #{order._id.substring(18).toUpperCase()}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="price-cell">₹{order.totalPrice}</td>
                <td>
                  <span
                    className={`status-pill ${(
                      order.orderStatus || "pending"
                    ).toLowerCase()}`}
                  >
                    {order.orderStatus || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
