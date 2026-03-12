import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./index.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, showSubmitError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitSuccess = (data) => {
    localStorage.setItem("jwt_token", data.token);
    localStorage.setItem("userRole", data.role);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.userId,
        name: data.name,
        email: data.email,
        role: data.role,
      }),
    );
    if (data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user-dashboard");
    }
    toast.success("Login successful");
  };

  const onSubmitFailure = () => {
    showSubmitError(true);
  };

  const validateFields = () => {
    let valid = true;
    if (email.trim() === "") {
      setEmailError("*Required");
      valid = false;
    } else {
      setEmailError("");
    }
    if (password.trim() === "") {
      setPasswordError("*Required");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://mernshoppingbackend-ygpp.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        onSubmitSuccess(data);
      } else {
        onSubmitFailure();
      }
    } catch (error) {
      onSubmitFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-bg-container">
        <div className="login-card">
          <h1 className="login-heading">Sign In</h1>
          <form onSubmit={onSubmitForm}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="error-msg">{emailError}</p>}
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
              {passwordError && <p className="error-msg">{passwordError}</p>}
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {submitError && <p className="error-msg">*Invalid credentials</p>}
          </form>

          <p className="footer-text">
            Don't have an account?{" "}
            <Link to="/" className="link-text">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
