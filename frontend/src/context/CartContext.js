import React from "react";

const CartContext = React.createContext({
  cartList: [],
  setCartList: () => {},
  fetchCart: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
});

CartContext.displayName = "CartContext";

export default CartContext;
