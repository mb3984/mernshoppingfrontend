import { NavLink, useNavigate } from "react-router-dom";
// Change FaLayout to FaThLarge here
import { FaThLarge, FaBox, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import "./index.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="admin-title">Admin Panel</h2>
        <p className="admin-subtitle">Admin</p>
      </div>

      <nav className="menu">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          {/* Use the new icon name here */}
          <FaThLarge className="nav-icon" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaBox className="nav-icon" />
          Products
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaShoppingCart className="nav-icon" />
          Orders
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="nav-icon" />
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
