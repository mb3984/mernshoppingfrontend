import { useContext } from "react";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartItem = ({ cartItem }) => {
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext);

  const { id, name, quantity, price, image_url } = cartItem;

  const totalPrice = price * quantity;

  return (
    <li className="cart-item">
      {/* Product Image */}
      <img src={image_url} alt={name} className="cart-item-image" />

      {/* Content */}
      <div className="cart-item-content">
        <div className="cart-item-header">
          <h3 className="cart-item-name">{name}</h3>
          {/* Desktop/Tablet Remove Icon */}
          <button
            type="button"
            className="cart-item-remove-icon-desktop"
            onClick={() => removeCartItem(id)}
            aria-label="Remove item"
          >
            <AiFillCloseCircle size={22} />
          </button>
        </div>

        <div className="cart-controls-row">
          {/* Quantity Controls */}
          <div className="cart-quantity-row">
            <button
              type="button"
              className="qty-btn"
              onClick={() => decrementCartItemQuantity(id)}
            >
              <BsDashSquare size={18} />
            </button>
            <span className="cart-qty">{quantity} kg</span>
            <button
              type="button"
              className="qty-btn"
              onClick={() => incrementCartItemQuantity(id)}
            >
              <BsPlusSquare size={18} />
            </button>
          </div>

          {/* Price Information */}
          <div className="cart-price-info">
            <p className="cart-total">
              <FaRupeeSign /> {totalPrice.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Mobile-only Remove Button */}
        <button
          type="button"
          className="cart-remove-btn-mobile"
          onClick={() => removeCartItem(id)}
        >
          Remove Item
        </button>
      </div>
    </li>
  );
};

export default CartItem;
