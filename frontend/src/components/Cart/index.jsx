import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartListView from "../CartListView";
import EmptyCartView from "../EmptyCartView";
import CartContext from "../../context/CartContext";
import "./index.css";

const Cart = () => {
  // Pull EVERYTHING needed from Context
  const {
    cartList,
    removeAllCartItems,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const isCartEmpty = cartList.length === 0;

  // Calculate Total Price
  const totalAmount = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const onClickRemoveAllBtn = () => {
    if (window.confirm("Are you sure you want to remove all items?")) {
      removeAllCartItems();
    }
  };

  const onProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      {/* Pass the global state to Navbar so redirection works */}
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="cart-page">
        <div className="cart-container">
          {isCartEmpty ? (
            <EmptyCartView />
          ) : (
            <>
              <div className="cart-header">
                <h1>Shopping Cart</h1>
                <div className="cart-header-actions">
                  <p>{cartList.length} Items</p>
                  <button
                    className="remove-all-btn"
                    onClick={onClickRemoveAllBtn}
                  >
                    Remove All
                  </button>
                </div>
              </div>

              <div className="cart-content">
                <div className="cart-items-section">
                  <CartListView />
                </div>

                <div className="cart-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-row">
                    <span>Items</span>
                    <span>{cartList.length}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery</span>
                    <span className="free">FREE</span>
                  </div>
                  <hr />
                  <div className="summary-total">
                    <span>Total</span>
                    <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>

                  <button
                    type="button"
                    className="checkout-btn"
                    onClick={onProceedToCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
