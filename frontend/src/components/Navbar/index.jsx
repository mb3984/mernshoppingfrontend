import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import CartContext from "../../context/CartContext";
import "./index.css";

const Navbar = ({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) => {
  const navigate = useNavigate();
  const { cartList } = useContext(CartContext);

  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : { name: "Guest" };

  const categories = [
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

  return (
    <header className="navbar-container">
      <div className="navbar-main">
        <Link to="/home" className="navbar-logo">
          <div className="logo-box">S</div>
          <span className="logo-text">ShopVerse</span>
        </Link>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for products..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className="search-button" type="button">
            <FaSearch />
          </button>
        </div>

        <div className="navbar-actions">
          <div className="action-item">
            <FaUser className="action-icon" />
            {/* Added label-text class here */}
            <span className="label-text">{userData.name}</span>
          </div>

          <Link to="/cart" className="action-item cart-nav-link">
            <div className="cart-icon-wrapper">
              <FaShoppingCart className="action-icon" />
              {cartList.length > 0 && (
                <span className="cart-badge">{cartList.length}</span>
              )}
            </div>
            {/* Added label-text class here */}
            <span className="label-text">Cart</span>
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="logout-icon-btn"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      <nav className="navbar-sub">
        <ul className="sub-nav-links">
          {categories.map((cat) => (
            <li
              key={cat}
              className={activeCategory === cat ? "active-sub-link" : ""}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
