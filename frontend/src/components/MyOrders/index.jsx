import { useEffect, useState, useContext } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartContext from "../../context/CartContext"; // Import Context
import "./index.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  // Access the global state so Navbar can use it
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } =
    useContext(CartContext);

  const token = localStorage.getItem("jwt_token");

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "https://mernshoppingbackend-ygpp.onrender.com/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (res.ok) {
        setOrders(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {/* Pass the global state to Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="orders-page">
        <h1 className="orders-title">My Orders</h1>

        {orders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order._id.slice(-6)}</h3>
                  <p>{new Date(order.createdAt).toDateString()}</p>
                </div>
                <span className={`status ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </div>

              {order.orderItems.map((item) => (
                <div key={item._id} className="order-item">
                  <img src={item.image} alt={item.name} />

                  <div className="order-details">
                    <p>{item.name}</p>
                    <span>
                      Qty: {item.quantity} × ₹{item.price}
                    </span>
                  </div>
                </div>
              ))}

              <div className="order-total">
                <p>Total</p>
                <strong>₹{order.totalPrice}</strong>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
