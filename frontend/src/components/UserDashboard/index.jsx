import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartContext from "../../context/CartContext";
import "./index.css";

// UPDATED: Full Categories List
const categoriesList = [
  "All",
  "Electronics",
  "Fashion",
  "Sports",
  "Toys",
  "Fruits",
  "Vegetables",
  "Grocery",
  "Books",
  "Appliances",
  "Watches",
  "Drinks",
];

const UserDashboard = ({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortOrder, setSortOrder] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addCartItem } = useContext(CartContext);
  const productsPerPage = 9;

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, currentPage, searchQuery, sortOrder]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Professional URL building using URLSearchParams
      const params = new URLSearchParams({
        page: currentPage,
        limit: productsPerPage,
        sort: sortOrder,
        search: searchQuery,
      });

      if (activeCategory !== "All") {
        params.append("category", activeCategory);
      }

      const url = `https://mernshoppingbackend-ygpp.onrender.com/api/products?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setProducts(data.products || []);
        setTotalProducts(data.totalCount || 0);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load products");
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={(cat) => {
          onCategoryChange(cat);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          onSearchChange(val);
          setCurrentPage(1);
        }}
      />

      <div className="dashboard-body">
        <aside className="sidebar-filters">
          <div className="filter-section">
            <h3 className="filter-title">Category</h3>
            <ul className="filter-list">
              {categoriesList.map((cat) => (
                <li
                  key={cat}
                  className={activeCategory === cat ? "active-filter" : ""}
                  onClick={() => {
                    onCategoryChange(cat);
                    setCurrentPage(1);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Sort By</h3>
            <ul className="filter-list">
              {["Default", "Price: Low to High", "Price: High to Low"].map(
                (sort) => (
                  <li
                    key={sort}
                    className={sortOrder === sort ? "active-filter" : ""}
                    onClick={() => {
                      setSortOrder(sort);
                      setCurrentPage(1);
                    }}
                  >
                    {sort}
                  </li>
                ),
              )}
            </ul>
          </div>
        </aside>

        <main className="main-content">
          <div className="content-header">
            <h1 className="main-title">{activeCategory} Products</h1>
            <p className="results-text">{totalProducts} items found</p>
          </div>

          {loading ? (
            <div className="loader-box">
              <ClipLoader color="#f97316" />
            </div>
          ) : (
            <div className="product-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="ecomm-card">
                    <div className="card-image-wrapper">
                      {product.discount > 0 && (
                        <span className="promo-badge">
                          {Math.round(product.discount)}% OFF
                        </span>
                      )}
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        loading="lazy"
                      />
                    </div>

                    <div className="card-details">
                      <span className="brand-tag">
                        {product.brand || "ShopVerse"}
                      </span>
                      <h4 className="p-name">{product.name}</h4>
                      <div className="rating-container">
                        <span className="rating-pill">
                          {product.rating || "4.0"} <FaStar size={10} />
                        </span>
                        <span className="rating-count">
                          ({product.numReviews || "0"}+)
                        </span>
                      </div>
                      <div className="price-container">
                        <span className="sale-price">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span className="mrp-price">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="card-actions">
                      <Link to={`/product/${product._id}`} className="view-btn">
                        Details
                      </Link>
                      <button
                        className="add-btn"
                        onClick={() => addCartItem(product)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-products-view">
                  <p className="no-products">
                    No products found for this filter.
                  </p>
                </div>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="pag-btn"
              >
                <FiChevronLeft />
              </button>
              <span className="page-info">
                Page <strong>{currentPage}</strong> of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="pag-btn"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
