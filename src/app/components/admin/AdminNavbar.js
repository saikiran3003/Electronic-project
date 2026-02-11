"use client";
import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav
      style={{
        background: "#111",
        color: "#fff",
        padding: 15,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      <Link href="/admin" style={{ color: "#fff" }}>
        Admin Panel
      </Link>
    </nav>
  );
}
