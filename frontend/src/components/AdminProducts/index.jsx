import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "./index.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("jwt_token");
    const res = await fetch(
      "https://mernshoppingbackend-ygpp.onrender.com/api/products/admin/all",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = await res.json();
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("jwt_token");
    if (!window.confirm("Delete this product?")) return;

    await fetch(
      `https://mernshoppingbackend-ygpp.onrender.com/api/products/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="admin-content-wrapper">
      <div className="page-header">
        <h2 className="main-heading">Products</h2>
        <Link to="/admin/addProduct" className="add-product-btn">
          <FaPlus /> Add Product
        </Link>
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="desktop-table-view">
        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="product-cell">
                      <img
                        src={
                          p.images?.[0] ||
                          p.image ||
                          "https://via.placeholder.com/40"
                        }
                        alt={p.name}
                        className="product-img"
                      />
                      <div className="product-info-text">
                        <span className="product-name">{p.name}</span>
                        <span className="product-brand">
                          {p.brand || "Brand"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="category-cell">{p.category}</td>
                  <td className="price-cell">
                    <span className="current-price">₹{p.price}</span>
                    {p.oldPrice && (
                      <span className="old-price">₹{p.oldPrice}</span>
                    )}
                  </td>
                  <td className="stock-cell">{p.stock}</td>
                  <td>
                    <div className="actions-cell">
                      <Link
                        to={`/admin/edit-product/${p._id}`}
                        className="edit-icon"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="delete-icon"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE PRODUCT LIST VIEW */}
      <div className="mobile-products-view">
        {products.map((p) => (
          <div key={p._id} className="product-mobile-card">
            <div className="product-card-top">
              <img
                src={
                  p.images?.[0] || p.image || "https://via.placeholder.com/40"
                }
                alt={p.name}
                className="mobile-product-img"
              />
              <div className="mobile-product-details">
                <span className="product-name">{p.name}</span>
                <span className="product-category">{p.category}</span>
                <div className="mobile-price">
                  <span className="current-price">₹{p.price}</span>
                  {p.oldPrice && (
                    <span className="old-price">₹{p.oldPrice}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="product-card-bottom">
              <div className="stock-info">
                <strong>Stock:</strong>{" "}
                <span className={p.stock < 10 ? "low-stock" : ""}>
                  {p.stock}
                </span>
              </div>
              <div className="mobile-actions">
                <Link to={`/admin/edit-product/${p._id}`} className="edit-btn">
                  <FaEdit /> Edit
                </Link>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="delete-btn"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
