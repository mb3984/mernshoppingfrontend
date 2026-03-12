import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import "./index.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      {/* Adding a main tag for better SEO and accessibility */}
      <main className="admin-main-container">
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
