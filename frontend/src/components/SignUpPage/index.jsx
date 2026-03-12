import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./index.css";

const API_BASE_URL = "https://mernshoppingbackend-ygpp.onrender.com";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) return setErrorMessage("Name is required");
    if (!email.trim()) return setErrorMessage("Email is required");
    if (!validateEmail(email)) return setErrorMessage("Invalid email format");
    if (!password.trim()) return setErrorMessage("Password is required");
    if (!validatePassword(password))
      return setErrorMessage(
        "Password must contain uppercase, lowercase, number & special character",
      );

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Registration failed");
        return;
      }

      navigate("/login");
      alert("User registered successfully");
    } catch (error) {
      console.log(error);
      setErrorMessage("Server not reachable. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signup-bg">
        <div className="signup-card">
          <h1 className="signup-heading">Create Account</h1>
          <form onSubmit={onSubmitForm}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="........"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {errorMessage && <p className="error-msg">{errorMessage}</p>}

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="sign-in-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
