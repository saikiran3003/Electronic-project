"use client";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  const fallbackImage = "/assets/images/tvimage.jpg";

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to load products");
        }

        const productList = data.products || data;

        if (isMounted) {
          setProducts(productList);
          setStatus("ready");
        }
      } catch (error) {
        if (isMounted) {
          setStatus("error");
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleBuyNow = (product) => {
    alert(`Buying: ${product.name}`);
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f8f9fa" }}>

      <h2
        style={{
          marginBottom: "30px",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        Our Products
      </h2>

      {status === "loading" && <p>Loading products...</p>}
      {status === "error" && (
        <p style={{ color: "red" }}>Unable to load products.</p>
      )}
      {status === "ready" && products.length === 0 && (
        <p>No products available yet.</p>
      )}

      {status === "ready" && products.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "25px",
          }}
        >
          {products.map((product) => {
            const imageSrc =
              product.image &&
                (product.image.startsWith("http://") ||
                  product.image.startsWith("https://") ||
                  product.image.startsWith("/"))
                ? product.image
                : fallbackImage;

            return (
              <div
                key={product._id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "18px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                {/* IMAGE WRAPPER */}
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbackImage;
                    }}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      transition: "transform 0.4s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>

                <h3
                  style={{
                    marginTop: "15px",
                    marginBottom: "8px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    minHeight: "40px",
                  }}
                >
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
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "#000",
                    }}
                  >
                    ₹{product.price}
                  </span>

                  <button
                    onClick={() => handleBuyNow(product)}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
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
