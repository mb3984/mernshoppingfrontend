import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    brand: "Generic",
    description: "",
    images: "",
    category: "Electronics",
    price: "",
    originalPrice: "",
    stock: "",
    isFeatured: false,
    sizes: "", // Added for Fashion/Sports
    colors: "", // Added for Fashion
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://mernshoppingbackend-ygpp.onrender.com/api/products/${id}`,
      );
      const data = await response.json();

      if (response.ok && data.product) {
        const p = data.product;
        setProduct({
          name: p.name || "",
          brand: p.brand || "Generic",
          description: p.description || "",
          images: p.images ? p.images.join(", ") : "",
          category: p.category || "Electronics",
          price: p.price || "",
          originalPrice: p.originalPrice || "",
          stock: p.stock || "",
          isFeatured: p.isFeatured || false,
          sizes: p.sizes ? p.sizes.join(", ") : "", // Convert array to string
          colors: p.colors ? p.colors.join(", ") : "", // Convert array to string
        });
      } else {
        setError("Product not found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt_token");
    if (!token) {
      alert("Unauthorized! Please login again.");
      return;
    }

    // Prepare data for API
    const updatedData = {
      ...product,
      images: product.images
        .split(",")
        .map((img) => img.trim())
        .filter((i) => i !== ""),
      sizes: product.sizes
        ? product.sizes
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
        : [],
      colors: product.colors
        ? product.colors
            .split(",")
            .map((c) => c.trim())
            .filter((c) => c !== "")
        : [],
      price: Number(product.price),
      originalPrice: Number(product.originalPrice),
      stock: Number(product.stock),
    };

    try {
      const response = await fetch(
        `https://mernshoppingbackend-ygpp.onrender.com/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (response.ok) {
        alert("Product updated successfully ✅");
        navigate("/admin/products");
      } else {
        alert("Failed to update product ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while updating product");
    }
  };

  if (loading) return <div className="loader">Loading product...</div>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="edit-product-container">
      <h2 className="edit-product-title">Edit Product</h2>

      <form className="edit-product-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Sports">Sports</option>
              <option value="Toys">Toys</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Grocery">Grocery</option>
              <option value="Books">Books</option>
              <option value="Appliances">Appliances</option>
              <option value="Watches">Watches</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        {/* Dynamic Fields for Fashion/Sports */}
        {(product.category === "Fashion" || product.category === "Sports") && (
          <div className="form-row">
            <div className="form-group">
              <label>Sizes (e.g. S, M, L, XL)</label>
              <input
                type="text"
                name="sizes"
                value={product.sizes}
                onChange={handleChange}
                placeholder="Small, Medium..."
              />
            </div>
            <div className="form-group">
              <label>Colors (e.g. Red, Blue, Black)</label>
              <input
                type="text"
                name="colors"
                value={product.colors}
                onChange={handleChange}
                placeholder="Black, White..."
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Image URLs (comma separated)</label>
          <input
            type="text"
            name="images"
            value={product.images}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Current Price (₹)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Original Price (₹)</label>
            <input
              type="number"
              name="originalPrice"
              value={product.originalPrice}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeatured"
              checked={product.isFeatured}
              onChange={handleChange}
            />
            <label htmlFor="isFeatured">Featured Product</label>
          </div>
        </div>

        <div className="edit-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="update-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
