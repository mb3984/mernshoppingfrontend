import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const goOrders = () => {
    navigate("/my-orders");
  };

  const goDashboard = () => {
    navigate("/user-dashboard");
  };

  return (
    <>
      {" "}
      <Navbar />
      <div className="order-success-container">
        <div className="success-card">
          <h1>Order Placed Successfully!</h1>

          <p>
            Your order has been confirmed and will be delivered soon. You can
            track your order in My Orders.
          </p>

          <div className="success-buttons">
            <button onClick={goOrders} className="orders-btn">
              View My Orders
            </button>

            <button onClick={goDashboard} className="shopping-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
