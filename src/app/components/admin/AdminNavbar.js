"use client";
import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav
      style={{
        background: "#ff0000ff",
        color: "#fff",
        padding: 15,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Link href="/admin" style={{ color: "#fff", textDecoration: "none", fontSize: "25px", fontWeight: "bold" }}>
        Admin Panel
      </Link>
    </nav>
  );
}
