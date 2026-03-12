import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(
        "https://mernshoppingbackend-ygpp.onrender.com/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (res.ok) {
        setCartItems(data.cart?.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  /* SUBTOTAL CALCULATION */

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();

  /* PLACE ORDER */

  const placeOrder = async () => {
    const itemsPrice = calculateSubtotal();

    const orderItems = cartItems.map((item) => ({
      product: item.product,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    try {
      const res = await fetch(
        "https://mernshoppingbackend-ygpp.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderItems,
            shippingAddress: shipping,
            paymentMethod: "COD",
            itemsPrice,
            shippingPrice: 0,
            totalPrice: itemsPrice,
          }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Order placed successfully");

        await fetch("https://mernshoppingbackend-ygpp.onrender.com/api/cart", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        window.location.href = "/order-success";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="checkout-page">
        <div className="checkout-container">
          {/* SHIPPING FORM */}

          <div className="shipping-card">
            <h2>Shipping Details</h2>

            <div className="form-row">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />

            <div className="form-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              onChange={handleChange}
            />

            <div className="payment-method">
              <h3>Payment Method</h3>

              <label className="cod-option">
                <input type="radio" checked readOnly />
                Cash on Delivery
              </label>
            </div>
          </div>

          {/* ORDER SUMMARY */}

          <div className="summary-card">
            <h2>Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item._id} className="summary-item">
                <img src={item.image} alt={item.name} />

                <div>
                  <p>{item.name}</p>
                  <span>Qty: {item.quantity}</span>
                </div>

                <p>₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
              </div>
            ))}

            <div className="summary-prices">
              <div>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div>
                <span>Shipping</span>
                <span className="free">Free</span>
              </div>

              <div className="total">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button className="place-order-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
