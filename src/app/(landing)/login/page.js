"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const payload = isLogin ? { email, password } : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || (isLogin ? "Login successful" : "Signup successful"));

        // if (data.token) {
        //   localStorage.setItem("token", data.token);
        //   router.push("/admin");
        // }
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userName", data.name || data.email || "User");
          localStorage.setItem("userEmail", data.email);

          const selectedProduct = localStorage.getItem("selectedProduct");

          if (selectedProduct) {
            router.push("/checkout");
          } else {
            router.push("/products");
          }
        }


        if (!isLogin) {
          setIsLogin(true); // Switch to login after successful signup
          setName("");
          setEmail("");
          setPassword("");
        }
      } else {
        alert(data.message || "Action failed");
      }
    } catch (error) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        {/* FORM START */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                passwordRef.current.focus(); // move to password
              }
            }}
            required
          />

          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isLogin
                ? "Login"
                : "Signup"}
          </button>
        </form>
        {/* FORM END */}

        <p>
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Signup" : " Login"}
          </span>
        </p>
      </div>

      <style jsx>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #1f2937, #111827);
        }

        .auth-card {
          background: #ffffff;
          padding: 40px;
          border-radius: 14px;
          width: 360px;
          text-align: center;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        h2 {
          margin-bottom: 25px;
          font-weight: 600;
        }

        input {
          width: 100%;
          padding: 12px;
          margin-bottom: 16px;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
          transition: 0.3s;
          font-size: 14px;
        }

        input:focus {
          border-color: black;
          box-shadow: 0 0 0 2px black;
        }

        button {
          width: 100%;
          padding: 12px;
          background: black;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
          font-weight: 500;
        }

        button:hover {
          background: #d01717ff;
        }

        button:disabled {
          background: #777;
          cursor: not-allowed;
        }

        p {
          margin-top: 18px;
          font-size: 14px;
        }

        span {
          color: #2563eb;
          cursor: pointer;
          font-weight: 500;
          margin-left: 5px;
        }

        span:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}



