import { useState, useEffect, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import axios from "axios";
import { toast } from "react-toastify";
// Components
import AdminProducts from "./components/AdminProducts";
import AdminLayout from "./components/AdminLayout";
import AdminOrders from "./components/AdminOrders";
import AdminDashboard from "./components/AdminDashboard";
import Checkout from "./components/Checkout";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDashboard from "./components/UserDashboard";
import ProductDetails from "./components/ProductDetails";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import EditProduct from "./components/EditProduct";
import Profile from "./components/Profile";
import OrderSuccess from "./components/OrderSuccess";
import MyOrders from "./components/MyOrders";

// Context
import CartContext from "./context/CartContext";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const API = "https://mernshoppingbackend-ygpp.onrender.com/api/cart";

const App = () => {
  const [cartList, setCartList] = useState([]);

  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) return;
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.cart?.items) {
        const formattedCart = res.data.cart.items.map((item) => ({
          id: item.product._id || item.product,
          name: item.name,
          price: item.price,
          image_url: item.image, // URL string stored in cart
          quantity: item.quantity,
        }));
        setCartList(formattedCart);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const cartRequest = async (url, method, data = {}) => {
    const token = localStorage.getItem("jwt_token");
    try {
      await axios({
        url,
        method,
        data,
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart(); // Immediate UI update
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  // Updated to support custom quantities
  const addCartItem = (productId, quantity = 1) => {
    toast.info("Updating cart...");
    cartRequest(`${API}/add`, "POST", { productId, quantity });
  };

  const removeCartItem = (productId) =>
    cartRequest(`${API}/${productId}`, "DELETE");
  const removeAllCartItems = async () => {
    const token = localStorage.getItem("jwt_token");
    try {
      // We call the clear endpoint
      await axios.delete(`${API}/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Manually clear the local state for an instant UI update
      setCartList([]);
      toast.success("Cart cleared successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    }
  };
  const incrementCartItemQuantity = (productId) => {
    // We don't need to find the item in state,
    // just tell the backend to ADD 1 to this product
    cartRequest(`${API}/add`, "POST", { productId, quantity: 1 });
  };
  const decrementCartItemQuantity = (productId) => {
    const item = cartList.find((each) => each.id === productId);

    if (item && item.quantity > 1) {
      // Tell the backend to ADD -1 (which is subtracting 1)
      cartRequest(`${API}/add`, "POST", { productId, quantity: -1 });
    } else {
      // If it's the last 1, use your working DELETE route
      removeCartItem(productId);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        setCartList,
        fetchCart,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bad-path" element={<NotFound />} />

        {/* User Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Route>

        <Route path="*" element={<Navigate to="/bad-path" replace />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </CartContext.Provider>
  );
};

export default App;
