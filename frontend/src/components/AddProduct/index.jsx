import { useState } from "react";
import "./index.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    image: "",
    category: "Electronics",
    price: "",
    originalPrice: "",
    stock: "",
    isFeatured: false,
    sizes: "", // Added
    colors: "", // Added
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt_token");

      // Data preparation
      const payload = {
        ...product,
        images: [product.image],
        price: Number(product.price),
        originalPrice: Number(product.originalPrice),
        stock: Number(product.stock),
        // Convert strings to arrays for the database
        sizes: product.sizes
          ? product.sizes.split(",").map((s) => s.trim())
          : [],
        colors: product.colors
          ? product.colors.split(",").map((c) => c.trim())
          : [],
        discount:
          product.originalPrice > 0
            ? ((product.originalPrice - product.price) /
                product.originalPrice) *
              100
            : 0,
      };

      const response = await fetch(
        "https://mernshoppingbackend-ygpp.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("✅ Product added successfully");
        setProduct({
          name: "",
          brand: "",
          description: "",
          image: "",
          category: "Electronics",
          price: "",
          originalPrice: "",
          stock: "",
          isFeatured: false,
          sizes: "",
          colors: "",
        });
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="add-product-bg">
      <div className="add-product-card">
        <h1 className="add-product-title">Add New Product</h1>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="input-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Sony WH-1000XM5"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row-group">
            <div className="input-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                placeholder="e.g. Sony"
                value={product.brand}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
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

          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe the product features..."
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Conditional Fields for Fashion & Sports */}
          {(product.category === "Fashion" ||
            product.category === "Sports") && (
            <div className="row-group animate-fade">
              <div className="input-group">
                <label>Sizes (S, M, L)</label>
                <input
                  type="text"
                  name="sizes"
                  placeholder="S, M, L, XL"
                  value={product.sizes}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Colors</label>
                <input
                  type="text"
                  name="colors"
                  placeholder="Red, Black"
                  value={product.colors}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={product.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row-group">
            <div className="input-group">
              <label>Original Price (₹)</label>
              <input
                type="number"
                name="originalPrice"
                placeholder="0.00"
                value={product.originalPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Selling Price (₹)</label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row-group">
            <div className="input-group">
              <label>Stock Count</label>
              <input
                type="number"
                name="stock"
                placeholder="Quantity"
                value={product.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="checkbox-container">
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

          <button type="submit" className="add-btn">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
