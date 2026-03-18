import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaBoxOpen } from "react-icons/fa";
import { toast } from "react-toastify"; // Optional: For better alerts
import "./index.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt_token");
      const res = await fetch(
        "https://mernshoppingbackend-ygpp.onrender.com/api/products/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("jwt_token");
    if (!window.confirm("Are you sure you want to delete this product? 🗑️"))
      return;

    try {
      const res = await fetch(
        `https://mernshoppingbackend-ygpp.onrender.com/api/products/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        alert("Product deleted successfully!");
      }
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  if (loading) return <div className="admin-loader">Fetching Products...</div>;

  return (
    <div className="admin-content-wrapper">
      <div className="page-header">
        <div className="header-text">
          <h2 className="main-heading">Inventory Management</h2>
          <p className="sub-text">Total Items: {products.length}</p>
        </div>
        <Link to="/admin/addProduct" className="add-product-btn">
          <FaPlus /> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <FaBoxOpen size={50} color="#cbd5e1" />
          <p>No products found in inventory.</p>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE VIEW */}
          <div className="desktop-table-view">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>Category</th>
                  <th>Pricing</th>
                  <th>In Stock</th>
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
                            "https://via.placeholder.com/60"
                          }
                          alt={p.name}
                          className="product-img"
                        />
                        <div className="product-info-text">
                          <span className="product-name">{p.name}</span>
                          <span className="product-brand">
                            {p.brand || "Generic"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge-category">{p.category}</span>
                    </td>
                    <td>
                      <div className="price-stack">
                        <span className="current-price">₹{p.price}</span>
                        {p.discount > 0 && (
                          <span className="discount-tag">
                            -{Math.round(p.discount)}%
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`stock-status ${p.stock < 10 ? "low" : "normal"}`}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <Link
                          to={`/admin/edit-product/${p._id}`}
                          className="edit-icon"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => deleteProduct(p._id)}
                          className="delete-icon"
                          title="Delete"
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

          {/* MOBILE VIEW */}
          <div className="mobile-products-view">
            {products.map((p) => (
              <div key={p._id} className="product-mobile-card">
                <div className="product-card-top">
                  <img
                    src={
                      p.images?.[0] ||
                      p.image ||
                      "https://via.placeholder.com/80"
                    }
                    alt={p.name}
                    className="mobile-product-img"
                  />
                  <div className="mobile-product-details">
                    <span className="product-name">{p.name}</span>
                    <span className="badge-category">{p.category}</span>
                    <div className="mobile-price">
                      <span className="current-price">₹{p.price}</span>
                      {p.discount > 0 && (
                        <span className="discount-tag">
                          -{Math.round(p.discount)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="product-card-bottom">
                  <div className="stock-info">
                    <strong>Stock:</strong>{" "}
                    <span
                      className={`stock-status ${p.stock < 10 ? "low" : ""}`}
                    >
                      {p.stock} {p.stock < 10 && "(Low)"}
                    </span>
                  </div>
                  <div className="mobile-actions">
                    <Link
                      to={`/admin/edit-product/${p._id}`}
                      className="edit-link"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="delete-btn"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProducts;
