import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartListView from "../CartListView";
import EmptyCartView from "../EmptyCartView";
import CartContext from "../../context/CartContext";
import "./index.css";

const Cart = () => {
  // Pull removeAllCartItems from context
  const { cartList, removeAllCartItems } = useContext(CartContext);

  const isCartEmpty = cartList.length === 0;

  // Logic to calculate Total Price
  const totalAmount = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <div className="cart-header-actions">
              <p>{cartList.length} Items</p>
              {!isCartEmpty && (
                <button className="remove-all-btn" onClick={removeAllCartItems}>
                  Remove All
                </button>
              )}
            </div>
          </div>

          {isCartEmpty ? (
            <EmptyCartView />
          ) : (
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
                  <span>₹{totalAmount}</span>
                </div>

                <button className="checkout-btn">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
