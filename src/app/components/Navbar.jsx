
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const userName = localStorage.getItem("userName");
      setIsLoggedIn(!!token || !!userName);
    };

    checkLogin();
    const interval = setInterval(checkLogin, 1000); // Polling for any page

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("selectedProduct");
    setIsLoggedIn(false);
    alert("Logout Successfully");
    router.push("/user/login");
  };

  return (
    <nav className="bg-red-500 border-b border-gray-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <button
          onClick={() => router.push("/home")}
          className="text-lg font-semibold hover:opacity-80"
        >
          Electronic Gadgets
        </button>

        <div className="flex gap-10 text-sm tracking-widest uppercase">

          <button onClick={() => router.push("/home")}>Home</button>
          <button onClick={() => router.push("/about")}>About</button>
          <button onClick={() => router.push("/products")}>Products</button>
          <button onClick={() => router.push("/contact")}>Contact</button>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hover:opacity-70"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/user/login")}
              className="hover:opacity-70"
            >
              Login
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}


