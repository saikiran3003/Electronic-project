"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 270,
        minHeight: "100vh",
       background: "#eef0f4ee",
        color: "black",
        padding: "20px",
        position: "fixed",
        top: 54,
        left: 0,
        marginTop: "-5px",
      }}
    >
      <h3 style={{ marginBottom: "25px" }}>Admin Menu</h3>

      <ul style={{ listStyle: "none", padding: 0, }}>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/admin/products" style={linkStyle}>
            Products
          </Link>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <Link href="/admin/products/add" style={linkStyle}>
            Add Product
          </Link>
        </li>

        <li>
          <Link href="/admin/cms" style={linkStyle}>
            Website CMS
          </Link>
        </li>

        <li>
          <Link href="/admin/logout" style={linkStyle}>
            Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
}

const linkStyle = {
  display: "block",
  padding: "10px 12px",
  color: "#0c0303ff",
  textDecoration: "none",
  borderRadius: "6px",
  transition: "all 0.3s ease",
};

/* Add global hover effect */
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    a:hover {
      background-color: #4caf50;
      color: #17e8deff !important;
    }
  `;
  document.head.appendChild(style);
}
