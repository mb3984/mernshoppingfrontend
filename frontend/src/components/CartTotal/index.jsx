import { useContext } from "react";
import CartItem from "../CartItem";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartListView = () => {
  const { cartList, removeAllCartItems } = useContext(CartContext);

  const onClickRemoveAllBtn = () => {
    if (window.confirm("Remove all items from cart?")) {
      removeAllCartItems();
    }
  };

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1 className="cart-title">My Cart</h1>
        {cartList.length > 0 && (
          <button className="remove-all-btn" onClick={onClickRemoveAllBtn}>
            Remove All
          </button>
        )}
      </div>

      {cartList.length === 0 ? (
        <div className="empty-cart-view">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <ul className="cart-items-list">
          {cartList.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </ul>
      )}

      {/* CartTotal removed from here as per your request */}
    </div>
  );
};

export default CartListView;
