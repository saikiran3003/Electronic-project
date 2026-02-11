"use client";
import { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("image", product.image);

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save product");
      }

      alert("Product Added Successfully ✅");
      setProduct({ name: "", price: "", description: "", image: null });
    } catch (error) {
      alert(`Save failed: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", marginTop: "60px", marginLeft: "220px" }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          value={product.name}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={product.price}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}
