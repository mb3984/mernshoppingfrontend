import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartContext from "../../context/CartContext";
import "./index.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addCartItem } = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://mernshoppingbackend-ygpp.onrender.com/api/products/${id}`,
        );
        const data = await response.json();
        if (response.ok) setProduct(data.product || data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) addCartItem(product._id, quantity);
  };

  const handleBuyNow = async () => {
    if (product) {
      await addCartItem(product._id, quantity);
      navigate("/cart");
    }
  };

  if (!product)
    return (
      <div className="loader-container">
        <ClipLoader color="#2874f0" size={50} />
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-container">
          <div className="product-image-section">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="product-image"
            />
            <div className="product-buttons">
              <button className="add-cart-btn" onClick={handleAddToCart}>
                ADD TO CART
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                BUY NOW
              </button>
            </div>
          </div>

          <div className="product-info">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-category">Category: {product.category}</p>
            <h3 className="product-price">₹{product.price}</h3>
            <p className="product-stock">
              Stock Available: {product.stock} units
            </p>

            <div className="quantity-container">
              <button
                className="qty-btn"
                onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
              >
                <BsDashSquare />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                className="qty-btn"
                onClick={() =>
                  quantity < product.stock && setQuantity((q) => q + 1)
                }
              >
                <BsPlusSquare />
              </button>
            </div>
            <p className="product-description">{product.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
