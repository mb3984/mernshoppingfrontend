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

const categoriesList = [
  "All",
  "Electronics",
  "Fruits",
  "Vegetables",
  "Grocery",
  "Books",
  "Appliances",
  "Watches",
  "Drinks",
];

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addCartItem } = useContext(CartContext);
  const productsPerPage = 9;

  // RE-FETCH when category or page changes
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Build API URL with category filter
      let url = `https://mernshoppingbackend-ygpp.onrender.com/api/products?page=${currentPage}&limit=50`;

      if (selectedCategory !== "All") {
        url += `&category=${selectedCategory}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        // Based on your backend: res.json({ success: true, products, totalCount })
        setProducts(data.products || []);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load products");
    }
    setLoading(false);
  };

  // Search & Sort (Category filtering is now handled by Backend)
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "Price: Low to High") return a.price - b.price;
      if (sortOrder === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  return (
    <div className="dashboard-wrapper">
      <Navbar
        activeCategory={selectedCategory}
        onCategoryChange={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="dashboard-body">
        <aside className="sidebar-filters">
          <div className="filter-section">
            <h3 className="filter-title">Category</h3>
            <ul className="filter-list">
              {categoriesList.map((cat) => (
                <li
                  key={cat}
                  className={selectedCategory === cat ? "active-filter" : ""}
                  onClick={() => {
                    setSelectedCategory(cat);
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
                    onClick={() => setSortOrder(sort)}
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
            <h1 className="main-title">{selectedCategory} Products</h1>
            <p className="results-text">
              {filteredProducts.length} items found
            </p>
          </div>

          {loading ? (
            <div className="loader-box">
              <ClipLoader color="#ff7011" />
            </div>
          ) : (
            <div className="product-grid">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <div key={product._id} className="ecomm-card">
                    <div className="card-image-wrapper">
                      {product.discount > 0 && (
                        <span className="promo-badge">
                          {Math.round(product.discount)}% OFF
                        </span>
                      )}
                      <img src={product.images?.[0]} alt={product.name} />
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
                        <span className="sale-price">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="mrp-price">
                            ₹{product.originalPrice}
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
                        onClick={() => addCartItem(product._id)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-products">
                  No products found in this category.
                </p>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <FiChevronLeft />
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
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
