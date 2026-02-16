"use client";
import { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product Added Successfully!");
  };

  return (
    <div style={{ marginLeft: "220px", padding: "30px", marginTop: "5px" }}>
      <h1>Admin - Manage Products</h1>

      <div
        style={{
          background: "#f4f4f4",
          padding: "30px",
          borderRadius: "15px",
          maxWidth: "400px",
          marginTop: "20px",
        }}
      >
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
            style={{ ...inputStyle, height: "120px" }}
          />

          {/* File Input */}
          <input
            type="file"
            name="image"
            onChange={handleChange}
            required
            className="custom-file-input"
            style={{ marginTop: "10px", marginBottom: "25px" }} // ✅ GAP ADDED HERE
          />

          <button type="submit" style={buttonStyle}>
            Add Product
          </button>
        </form>
      </div>

      {/* CSS to remove "No file chosen" */}
      <style jsx>{`
        .custom-file-input {
          color: transparent;
        }

        .custom-file-input::-webkit-file-upload-button {
          visibility: visible;
        }

        .custom-file-input::file-selector-button {
          visibility: visible;
        }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
};
