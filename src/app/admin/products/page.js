// "use client";

// import { useEffect, useState, useRef } from "react";

// export default function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   const formRef = useRef(null);

//   const fallbackImage = "/assets/images/tvimage.jpg";

//   // =========================
//   // FETCH PRODUCTS
//   // =========================
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("/api/products");
//       const data = await res.json();
//       if (data.success) {
//         setProducts(data.products);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // =========================
//   // ADD / UPDATE PRODUCT
//   // =========================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let res;

//       if (editingId) {
//         res = await fetch("/api/products", {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             _id: editingId,
//             name,
//             price,
//             description,
//           }),
//         });
//       } else {
//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("price", price);
//         formData.append("description", description);
//         formData.append("image", imageFile);

//         res = await fetch("/api/products", {
//           method: "POST",
//           body: formData,
//         });
//       }

//       const data = await res.json();

//       if (data.success) {
//         alert(
//           editingId
//             ? "Product updated successfully ✅"
//             : "Product added successfully ✅"
//         );
//         resetForm();
//         fetchProducts();
//       } else {
//         alert(data.message || "Operation failed ❌");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong ❌");
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingId(product._id);
//     setName(product.name);
//     setPrice(product.price);
//     setDescription(product.description);

//     setTimeout(() => {
//       formRef.current?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }, 100);
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = confirm("Are you sure you want to delete this product?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("Deleted successfully ✅");
//         setProducts((prev) => prev.filter((p) => p._id !== id));
//       } else {
//         alert(data.message || "Deletion failed ❌");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong ❌");
//     }
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setName("");
//     setPrice("");
//     setDescription("");
//     setImageFile(null);
//   };

//   // =========================
//   // UI
//   // =========================
//   return (
//     <div
//       style={{
//         padding: "40px",
//         background: "#eef0f4ff",
//         color: "#000",
//         marginLeft: "80px",
//         marginTop: "-10px",
//       }}
//     >
//       <h1 style={{ marginBottom: "10px", marginTop: "2px" }}>Admin - Manage Products</h1>

//       {/* FORM */}
//       <form
//         ref={formRef}
//         onSubmit={handleSubmit}
//         style={{
//           marginBottom: "50px",
//           background: "#fff",
//           padding: "25px",
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//           maxWidth: "450px",
//         }}
//       >
//         <h2 style={{ marginBottom: "15px" }}>
//           {editingId ? "Update Product" : "Add Product"}
//         </h2>

//         <input
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//           style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
//         />

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "12px",
//             minHeight: "80px",
//           }}
//         />

//         {!editingId && (
//           <input
//             type="file"
//             onChange={(e) => setImageFile(e.target.files[0])}
//             required
//             className="custom-file-input"
//             style={{ marginBottom: "15px", color: "black" }}
//           />
//         )}

//         <div style={{ display: "flex", gap: "10px" }}>
//           <button
//             type="submit"
//             style={{
//               background: editingId ? "#ff9800" : "#28a745",
//               color: "#fff",
//               padding: "10px 20px",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//           >
//             {editingId ? "Update Product" : "Add Product"}
//           </button>

//           {editingId && (
//             <button
//               type="button"
//               onClick={resetForm}
//               style={{
//                 background: "#1976d2",
//                 color: "#fff",
//                 padding: "10px 20px",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//               }}
//             >
//               Add Product
//             </button>
//           )}
//         </div>
//       </form>

//       {/* PRODUCTS GRID */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: "25px",
//         }}
//       >
//         {products.map((product) => (
//           <div
//             key={product._id}
//             style={{
//               background: "#fff",
//               padding: "18px",
//               borderRadius: "12px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//             }}
//           >
//             <div style={{ overflow: "hidden", borderRadius: "10px" }}>
//               <img
//                 src={product.image || fallbackImage}
//                 alt={product.name}
//                 style={{
//                   width: "100%",
//                   height: "180px",
//                   objectFit: "contain",
//                   transition: "transform 0.4s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.transform = "scale(1.3)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.transform = "scale(1)")
//                 }
//               />
//             </div>

//             <h3 style={{ marginTop: "12px" }}>{product.name}</h3>
//             <p style={{ fontSize: "14px", color: "#555" }}>
//               {product.description}
//             </p>
//             <strong style={{ fontSize: "16px" }}>₹{product.price}</strong>

//             <div style={{ marginTop: "12px" }}>
//               <button
//                 onClick={() => handleEdit(product)}
//                 style={{
//                   background: "#ff9800",
//                   color: "#fff",
//                   border: "none",
//                   padding: "6px 12px",
//                   borderRadius: "5px",
//                   marginRight: "10px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => handleDelete(product._id)}
//                 style={{
//                   background: "#e53935",
//                   color: "#fff",
//                   border: "none",
//                   padding: "6px 12px",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ REMOVE "No file chosen" TEXT */}
//       <style jsx>{`
//         .custom-file-input {
//           color: transparent;
//         }

//         .custom-file-input::-webkit-file-upload-button {
//           visibility: visible;
//         }

//         .custom-file-input::file-selector-button {
//           visibility: visible;
//         }
//       `}</style>
//     </div>
//   );
// }



"use client";

import { useEffect, useState, useRef } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]); // Array of File objects
  const [existingImages, setExistingImages] = useState([]); // URLs of existing images for edit

  const formRef = useRef(null);
  const fileInputRef = useRef(null);

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
  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setExistingImages(product.images || [product.image]);
    setGalleryFiles([]); // Clear new file selection

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);

      if (editingId) {
        formData.append("_id", editingId);

        // If new galleryFiles are present, upload them
        if (galleryFiles.length > 0) {
          // Send existing images so API can append new ones after them
          existingImages.forEach((img) => {
            formData.append("existingImages", img);
          });

          galleryFiles.forEach((file) => {
            formData.append("images", file); // Consistent field name 'images'
          });
          res = await fetch("/api/products", {
            method: "PUT",
            body: formData,
          });
        } else {
          // JSON update if no new images
          res = await fetch("/api/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              _id: editingId,
              name,
              price,
              description,
              images: existingImages, // Keep current gallery if no new uploads
              image: existingImages[0]
            }),
          });
        }
      } else {
        // ADD NEW
        if (galleryFiles.length === 0) {
          alert("Please select at least one image ❌");
          return;
        }
        galleryFiles.forEach((file) => {
          formData.append("images", file);
        });
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
        alert(data.error || data.message || "Operation failed ❌");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong ❌");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setDescription("");
    setGalleryFiles([]);
    setExistingImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // =========================
  // UI
  // =========================
  return (
    <div
      style={{
        padding: "40px",
        background: "#f4f6f9",
        color: "#000",
        marginLeft: "80px",
        marginTop: "-10px",
      }}
    >
      <h1 style={{ marginBottom: "30px", marginTop: "2px" }}>Admin - Manage Products</h1>

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
          style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
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
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        {/* IMAGE UPLOAD SECTION */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Images</label>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
            {/* Existing Images (Edit mode) */}
            {existingImages.map((img, idx) => (
              <div key={`exist-${idx}`} style={{ position: "relative" }}>
                <img src={img} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ddd" }} />
                <button
                  type="button"
                  onClick={() => removeExistingImage(idx)}
                  style={{ position: "absolute", top: "-5px", right: "-5px", background: "red", color: "white", borderRadius: "50%", border: "none", width: "18px", height: "18px", fontSize: "10px", cursor: "pointer" }}
                >✕</button>
              </div>
            ))}

            {/* New Files */}
            {galleryFiles.map((file, idx) => (
              <div key={`new-${idx}`} style={{ position: "relative", background: "#e9ecef", width: "60px", height: "60px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", textAlign: "center", border: "1px dashed #adb5bd" }}>
                {file.name.substring(0, 10)}...
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  style={{ position: "absolute", top: "-5px", right: "-5px", background: "#6c757d", color: "white", borderRadius: "50%", border: "none", width: "18px", height: "18px", fontSize: "10px", cursor: "pointer" }}
                >✕</button>
              </div>
            ))}

            {/* Add Image Option */}
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{ width: "60px", height: "60px", border: "2px dashed #007bff", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#007bff", fontSize: "20px" }}
            >+</div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              background: editingId ? "#ff9800" : "#28a745",
              color: "#fff",
              padding: "12px 25px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            {editingId ? "Update Product" : "Save Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                background: "#1976d2",
                color: "#fff",
                padding: "12px 25px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Add New Product
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
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              height: "440px", // Fixed uniform height
              transition: "transform 0.3s ease",
            }}
          >
            {/* Image Container with fixed height */}
            <div style={{
              height: "180px",
              width: "100%",
              overflow: "hidden",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fafafa"
            }}>
              <img
                src={product.image || fallbackImage}
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  transition: "transform 0.4s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>

            {/* Product info with flexible height and full visibility for title */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", marginTop: "15px", overflow: "hidden" }}>
              <h3 style={{
                fontSize: "17px",
                fontWeight: "700",
                marginBottom: "8px",
                lineHeight: "1.3",
                color: "#333"
                // Removed height and clamping to show full name
              }}>
                {product.name}
              </h3>

              <p style={{
                fontSize: "14px",
                color: "#666",
                lineHeight: "1.4",
                display: "-webkit-box",
                WebkitLineClamp: 3, // Allow a bit more for description but keep it clamped to avoid overflow
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: "10px"
              }}>
                {product.description}
              </p>

              <div style={{ marginTop: "auto" }}>
                <strong style={{ fontSize: "22px", color: "#2563eb" }}>₹{product.price}</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEdit(product)}
                style={{
                  flex: 1,
                  background: "#ff9800",
                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                style={{
                  flex: 1,
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px"
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
