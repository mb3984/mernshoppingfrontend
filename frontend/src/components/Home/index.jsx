import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // We fetch storage values inside useEffect to ensure we get the latest
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("jwt_token");

    // Instant redirection logic
    if (!token) {
      // Use { replace: true } so the user can't click "Back" to get to the loader
      navigate("/login", { replace: true });
    } else if (userRole === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/user-dashboard", { replace: true });
    }
  }, [navigate]);

  // We return a simple loader just in case the browser takes a millisecond to process
  return (
    <div className="home-loader-container">
      <div className="loader"></div>
      <h2 className="redirect-text">Verifying Session...</h2>
    </div>
  );
};

export default Home;
