"use client";

import { useEffect, useState, useRef } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const formRef = useRef(null);

  const fallbackImage = "/assets/images/tvimage.jpg";

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (editingId) {
        // UPDATE
        res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: editingId,
            name,
            price,
            description,
          }),
        });
      } else {
        // ADD
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", imageFile);

        res = await fetch("/api/products", {
          method: "POST",
          body: formData,
        });
      }

      const data = await res.json();

      if (data.success) {
        alert(
          editingId
            ? "Product updated successfully ✅"
            : "Product added successfully ✅"
        );
        resetForm();
        fetchProducts();
      } else {
        alert(data.message || "Operation failed ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete product ❌");
        return;
      }

      const data = await res.json();

      if (data.success) {
        alert("Deleted successfully ✅");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.message || "Deletion failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setDescription("");
    setImageFile(null);
  };

  // =========================
  // UI
  // =========================
  return (
    <div style={{ padding: "40px", background: "#f4f6f9", color: "#000", marginLeft: "220px", marginTop: "40px" }}>
      <h1 style={{ marginBottom: "30px" }}>Admin - Manage Products</h1>

      {/* FORM */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          marginBottom: "50px",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          {editingId ? "Update Product" : "Add Product"}
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            minHeight: "80px",
          }}
        />

        {!editingId && (
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
            style={{ marginBottom: "12px" }}
          />
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              background: editingId ? "#ff9800" : "#28a745",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                background: "#1976d2",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Add Product
            </button>
          )}
        </div>
      </form>

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "25px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              background: "#fff",
              padding: "18px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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

            <h3 style={{ marginTop: "12px" }}>{product.name}</h3>

            <p style={{ fontSize: "14px", color: "#555" }}>{product.description}</p>

            <strong style={{ fontSize: "16px" }}>₹{product.price}</strong>

            <div style={{ marginTop: "12px" }}>
              <button
                onClick={() => handleEdit(product)}
                style={{
                  background: "#ff9800",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                style={{
                  background: "#e53935",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
