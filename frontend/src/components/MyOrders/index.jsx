import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

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
      {" "}
      <Navbar />
      <div className="orders-page">
        <h1 className="orders-title">My Orders</h1>

        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <h3>Order #{order._id.slice(-6)}</h3>
                <p>{new Date(order.createdAt).toDateString()}</p>
              </div>

              <span className="status">{order.orderStatus}</span>
            </div>

            {order.orderItems.map((item) => (
              <div key={item._id} className="order-item">
                <img src={item.image} alt={item.name} />

                <div className="order-details">
                  <p>{item.name}</p>
                  <span>
                    Qty: {item.quantity} × ${item.price}
                  </span>
                </div>
              </div>
            ))}

            <div className="order-total">
              <p>Total</p>
              <strong>${order.totalPrice}</strong>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
