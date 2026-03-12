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
      const response = await fetch(
        "https://mernshoppingbackend-ygpp.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: product.name,
            brand: product.brand,
            description: product.description,
            images: [product.image],
            category: product.category,
            price: Number(product.price),
            originalPrice: Number(product.originalPrice),
            discount:
              ((product.originalPrice - product.price) /
                product.originalPrice) *
              100,
            stock: Number(product.stock),
            isFeatured: product.isFeatured,
          }),
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
    <>
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
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Describe the product features..."
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>

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

            <div className="input-group">
              <label>Category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="Electronics">Electronics</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grocery">Grocery</option>
                <option value="Books">Books</option>
                <option value="Appliances">Appliances</option>
                <option value="Watches">Watches</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>

            <div className="row-group">
              <div className="input-group">
                <label>Original Price</label>
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
                <label>Selling Price</label>
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

            <button type="submit" className="add-btn">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
