import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartContext from "../../context/CartContext"; // Import Context
import "./index.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // Access global state for the Navbar
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } =
    useContext(CartContext);

  const goOrders = () => {
    navigate("/my-orders");
  };

  const goDashboard = () => {
    navigate("/user-dashboard");
  };

  return (
    <>
      {/* Pass the global state to Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="order-success-container">
        <div className="success-card">
          <div className="success-icon-wrapper">
            {/* You can add a checkmark icon here if you have one */}
            <span className="success-checkmark">✔</span>
          </div>
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
