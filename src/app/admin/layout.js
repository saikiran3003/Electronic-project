import AdminNavbar from "../components/admin/AdminNavbar";
import Sidebar from "../components/admin/Sidebar";
import "../globals.css";

export default function AdminLayout({ children }) {
  return (
    <html>
      <body>
        <AdminNavbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <main style={{ padding: 20, flex: 1 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
