import { useContext } from "react";
import CartItem from "../CartItem";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartListView = () => {
  const { cartList } = useContext(CartContext);

  // This component now ONLY renders the list of items.
  // The Header, Remove All button, and Total are managed by Cart.jsx.
  return (
    <ul className="cart-items-list">
      {cartList.map((item) => (
        <CartItem key={item.id} cartItem={item} />
      ))}
    </ul>
  );
};

export default CartListView;
