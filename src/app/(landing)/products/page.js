"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  const fallbackImage = "/assets/images/tvimage.jpg";

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (!res.ok) throw new Error("Failed");

        const productList = data.products || data;

        if (isMounted) {
          setProducts(productList);
          setStatus("ready");
        }
      } catch {
        if (isMounted) setStatus("error");
      }
    };

    loadProducts();
    return () => (isMounted = false);
  }, []);

  const handleBuyNow = () => {
    // Redirect to login page if not authenticated
    const isAuthenticated = localStorage.getItem("authToken"); // Check if user is authenticated
    if (isAuthenticated) {
      // If user is logged in, you can proceed with purchase (e.g., redirect to checkout)
      router.push("/checkout");  // Checkout page (change this as per your setup)
    } else {
      // If user is not logged in, redirect to the login page (navbar login page)
      router.push("/user/login");  // Navbar login page (adjust this path if needed)
    }
  };

  return (
    <div style={{ padding: "40px 20px", background: "#f8f9fa" }}>
      <h1 style={{ textAlign: "start", marginBottom: "30px", color: "black", fontWeight: "bold", fontSize: "24px" }}>
        Our Products
      </h1>

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p style={{ color: "red" }}>Error loading</p>}

      {status === "ready" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "25px",
          }}
        >
          {products.map((product) => {
            const imageSrc =
              product.image &&
                (product.image.startsWith("http") ||
                  product.image.startsWith("/"))
                ? product.image
                : fallbackImage;

            return (
              <div
                key={product._id}
                style={{
                  background: "#fff",
                  padding: "18px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                {/* Image Wrapper */}
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ overflow: "hidden", borderRadius: "10px" }}>
                    <img
                      src={product.image || fallbackImage}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "contain",
                        transition: "transform 0.4s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>
                </div>

                <h2 style={{ marginTop: "15px", color: "black", fontWeight: "bold" }}>
                  {product.name}
                </h2>

                <p style={{ fontSize: "14px", color: "black" }}>
                  {product.description}
                </p>

                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    ₹{product.price}
                  </span>

                  <button
                    onClick={handleBuyNow}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#0056b3")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#007bff")
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
