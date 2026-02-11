import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        minHeight: "100vh",
        background: "#222",
        color: "#fff",
        padding: 20,
        position: "fixed",
        top: 54,
        left: 0,

      }}
    >
      <h3>Admin Menu</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/admin/products" style={{ color: "#fff" }}>
            Products
          </Link>
        </li>

        <li style={{ marginTop: 10 }}>
          <Link href="/admin/products/add" style={{ color: "#fff" }}>
            Add Product
          </Link>
        </li>

        <li style={{ marginTop: 10 }}>
          <Link href="/admin/cms" style={{ color: "#fff" }}>
            Website CMS
          </Link>
        </li>
      </ul>
    </aside>
  );
}
