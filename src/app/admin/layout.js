"use client";

import { usePathname } from "next/navigation";
import AdminNavbar from "../components/admin/AdminNavbar";
import Sidebar from "../components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // If it's the login page, render only the children
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <>
      <AdminNavbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ padding: 20, flex: 1, marginTop: "60px", marginLeft: "180px" }}>
          {children}
        </main>
      </div>
    </>
  );
}
