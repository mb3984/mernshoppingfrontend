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
  // Add these for better autocomplete and consistency
  activeCategory: "All",
  setActiveCategory: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

CartContext.displayName = "CartContext";

export default CartContext;
