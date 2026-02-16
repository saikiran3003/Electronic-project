"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/api/login" : "/api/signup";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // ✅ If login success
      if (isLogin) {
        localStorage.setItem("token", data.token);
        alert("Login Successful");
        router.push("/products"); // 🔥 Redirect
      } else {
        alert("Signup Successful. Please Login.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="toggle-text">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Sign Up" : " Login"}
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to right, #f4f4f5ff, #fefeffff);
        }

        .auth-box {
          width: 350px;
          padding: 30px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          text-align: center;
        }

        .auth-box h2 {
          margin-bottom: 20px;
        }

        .auth-box input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 6px;
          border: 1px solid #ccc;
          outline: none;
        }

        .auth-box input:focus {
          border-color: #667eea;
        }

        .password-field {
          position: relative;
        }

        .password-field span {
          position: absolute;
          right: 10px;
          top: 10px;
          cursor: pointer;
          font-size: 12px;
          color: #667eea;
        }

        .auth-box button {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 6px;
          background-color: #667eea;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .auth-box button:hover {
          background-color: #5a67d8;
        }

        .toggle-text {
          margin-top: 15px;
          font-size: 14px;
        }

        .toggle-text span {
          color: #667eea;
          cursor: pointer;
          font-weight: bold;
        }

        .toggle-text span:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
