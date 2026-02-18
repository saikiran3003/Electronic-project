"use client";

// import { useEffect, useState } from "react";

// export default function ProductDetails() {
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const storedProduct = localStorage.getItem("selectedProduct");
//     if (storedProduct) setProduct(JSON.parse(storedProduct));
//   }, []);

//   if (!product) return <p style={{ padding: "60px" }}>Loading product...</p>;

//   return (
//     <div style={{ padding: "60px", background: "#f5f7fa", minHeight: "100vh" }}>
//       <div style={{ display: "flex", gap: "60px", background: "#fff", padding: "40px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", alignItems: "center" }}>
//         {/* LEFT SIDE BIG IMAGE */}
//         <div style={{ flex: "0 0 450px" }}>
//           <img
//             src={product.image}
//             alt={product.name}
//             style={{ width: "100%", height: "450px", objectFit: "contain" }}
//           />
//         </div>

//         {/* RIGHT SIDE DETAILS */}
//         <div style={{ flex: 1 }}>
//           <h1 style={{ fontSize: "30px", fontWeight: "600" }}>{product.name}</h1>

//           <h2 style={{ color: "#B12704", marginTop: "20px", fontSize: "26px" }}>
//             ₹{product.price}
//           </h2>

//           <p style={{ marginTop: "25px", lineHeight: "1.8", fontSize: "16px", color: "#444" }}>
//             {product.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      const parsed = JSON.parse(storedProduct);
      setProduct(parsed);
      // If product has multiple images use them, else fallback
      setMainImage(parsed.images?.[0] || parsed.image || "/assets/images/tvimage.jpg");
    }
  }, []);

  if (!product) return <p style={{ padding: "60px" }}>Loading product...</p>;

  // Fallback for multiple images
  const productImages = product.images || [product.image];

  return (
    <div style={{ padding: "60px", background: "#f5faf9ff", minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          gap: "60px",
          background: "#f0fbfbff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT SIDE BIG IMAGE WITH ZOOM */}
        <div style={{ flex: "0 0 450px" }}>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: product.name,
                isFluidWidth: true,
                src: mainImage,
              },
              largeImage: {
                src: mainImage,
                width: 1200,
                height: 1200,
              },
              enlargedImageContainerDimensions: {
                width: "150%",
                height: "150%",
              },
              hoverDelayInMs: 0,
              hoverOffDelayInMs: 0,
            }}
          />

          {/* THUMBNAILS */}
          <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
            {productImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name}-${idx}`}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                  border: mainImage === img ? "2px solid #007bff" : "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "30px", fontWeight: "600",color: "#000000ff" }}>{product.name}</h1>

          <h2 style={{ color: "#000000ff", marginTop: "20px", fontSize: "26px" }}>
            ₹{product.price}
          </h2>

          <p style={{ marginTop: "25px", lineHeight: "1.8", fontSize: "16px", color: "#444" }}>
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import ReactImageMagnify from "react-image-magnify";

// export default function ProductDetails() {
//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState("");

//   useEffect(() => {
//     const storedProduct = localStorage.getItem("selectedProduct");
//     if (storedProduct) {
//       const parsed = JSON.parse(storedProduct);
//       setProduct(parsed);
//       // If product has multiple images use them, else fallback
//       setMainImage(parsed.images?.[0] || parsed.image || "/assets/images/tvimage.jpg");
//     }
//   }, []);

//   if (!product) return <p style={{ padding: "60px" }}>Loading product...</p>;

//   // Fallback for multiple images
//   const productImages = product.images || [product.image];

//   return (
//     <div style={{ padding: "60px", background: "#f5faf9ff", minHeight: "100vh" }}>
//       <div
//         style={{
//           display: "flex",
//           gap: "60px",
//           background: "#f0fbfbff",
//           padding: "40px",
//           borderRadius: "20px",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//           alignItems: "flex-start",
//         }}
//       >
//         {/* LEFT SIDE BIG IMAGE WITH ZOOM */}
//         <div style={{ flex: "0 0 450px" }}>
//           <ReactImageMagnify
//             {...{
//               smallImage: {
//                 alt: product.name,
//                 isFluidWidth: true,
//                 src: mainImage,
//               },
//               largeImage: {
//                 src: mainImage,
//                 width: 1200,
//                 height: 1200,
//               },
//               enlargedImageContainerDimensions: {
//                 width: "150%",
//                 height: "150%",
//               },
//               hoverDelayInMs: 0,
//               hoverOffDelayInMs: 0,
//             }}
//           />

//           {/* THUMBNAILS */}
//           <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
//             {productImages.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={`${product.name}-${idx}`}
//                 style={{
//                   width: "70px",
//                   height: "70px",
//                   objectFit: "contain",
//                   border: mainImage === img ? "2px solid #007bff" : "1px solid #ccc",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => setMainImage(img)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* RIGHT SIDE DETAILS */}
//         <div style={{ flex: 1 }}>
//           <h1 style={{ fontSize: "30px", fontWeight: "600" }}>{product.name}</h1>

//           <h2 style={{ color: "#000000ff", marginTop: "20px", fontSize: "26px" }}>
//             ₹{product.price}
//           </h2>

//           <p style={{ marginTop: "25px", lineHeight: "1.8", fontSize: "16px", color: "#444" }}>
//             {product.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




// // "use client";

// // import { useEffect, useState } from "react";
// // import ReactImageMagnify from "react-image-magnify";

// // export default function ProductDetails() {
// //   const [product, setProduct] = useState(null);
// //   const [mainImage, setMainImage] = useState("");

// //   const fallbackImage = "/assets/images/tvimage.jpg";

// //   useEffect(() => {
// //     const storedProduct = localStorage.getItem("selectedProduct");

// //     if (storedProduct) {
// //       const parsed = JSON.parse(storedProduct);

// //       // 🔥 ALWAYS convert to array
// //       let imagesArray = [];

// //       if (Array.isArray(parsed.images) && parsed.images.length > 0) {
// //         imagesArray = parsed.images;
// //       } else if (parsed.image) {
// //         imagesArray = [parsed.image];
// //       } else {
// //         imagesArray = [fallbackImage];
// //       }

// //       parsed.images = imagesArray;

// //       setProduct(parsed);
// //       setMainImage(imagesArray[0]);
// //     }
// //   }, []);

// //   if (!product) return <p style={{ padding: "60px" }}>Loading product...</p>;

// //   const productImages = product.images;

// //   return (
// //     <div style={{ padding: "60px", background: "#f5faf9ff", minHeight: "100vh" }}>
// //       <div
// //         style={{
// //           display: "flex",
// //           gap: "60px",
// //           background: "#f0fbfbff",
// //           padding: "40px",
// //           borderRadius: "20px",
// //           boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
// //           alignItems: "flex-start",
// //         }}
// //       >
// //         {/* LEFT SIDE BIG IMAGE WITH ZOOM */}
// //         <div style={{ flex: "0 0 450px" }}>
// //           <ReactImageMagnify
// //             {...{
// //               smallImage: {
// //                 alt: product.name,
// //                 isFluidWidth: true,
// //                 src: mainImage,
// //               },
// //               largeImage: {
// //                 src: mainImage,
// //                 width: 1200,
// //                 height: 1200,
// //               },
// //               enlargedImageContainerDimensions: {
// //                 width: "150%",
// //                 height: "150%",
// //               },
// //               hoverDelayInMs: 0,
// //               hoverOffDelayInMs: 0,
// //             }}
// //           />

// //           {/* THUMBNAILS */}
// //           <div style={{ display: "flex", gap: "15px", marginTop: "15px", overflowX: "auto" }}>
// //             {productImages.map((img, idx) => (
// //               <img
// //                 key={idx}
// //                 src={img}
// //                 alt={`${product.name}-${idx}`}
// //                 style={{
// //                   width: "70px",
// //                   height: "70px",
// //                   objectFit: "contain",
// //                   border: mainImage === img ? "2px solid #007bff" : "1px solid #ccc",
// //                   borderRadius: "8px",
// //                   cursor: "pointer",
// //                 }}
// //                 onClick={() => setMainImage(img)}
// //               />
// //             ))}
// //           </div>
// //         </div>

// //         {/* RIGHT SIDE DETAILS */}
// //         <div style={{ flex: 1 }}>
// //           <h1 style={{ fontSize: "30px", fontWeight: "600" }}>{product.name}</h1>

// //           <h2 style={{ color: "#000000ff", marginTop: "20px", fontSize: "26px" }}>
// //             ₹{product.price}
// //           </h2>

// //           <p style={{ marginTop: "25px", lineHeight: "1.8", fontSize: "16px", color: "#444" }}>
// //             {product.description}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // "use client";

// // import { useEffect, useState } from "react";
// // import ReactImageMagnify from "react-image-magnify";

// // export default function ProductDetails() {
// //   const [product, setProduct] = useState(null);
// //   const [mainImage, setMainImage] = useState("");

// //   const fallbackImage = "/assets/images/tvimage.jpg";

// //   useEffect(() => {
// //     const storedProduct = localStorage.getItem("selectedProduct");

// //     if (storedProduct) {
// //       const parsed = JSON.parse(storedProduct);

// //       let imagesArray = [];

// //       if (Array.isArray(parsed.images) && parsed.images.length > 0) {
// //         imagesArray = parsed.images;
// //       } else if (parsed.image) {
// //         imagesArray = [parsed.image];
// //       } else {
// //         imagesArray = [fallbackImage];
// //       }

// //       parsed.images = imagesArray;

// //       setProduct(parsed);
// //       setMainImage(imagesArray[0]);
// //     }
// //   }, []);

// //   if (!product) return <p style={{ padding: "60px" }}>Loading product...</p>;

// //   const productImages = product.images;

// //   return (
// //     <div style={{ padding: "60px", background: "#f5faf9", minHeight: "100vh" }}>
// //       <div
// //         style={{
// //           display: "flex",
// //           gap: "60px",
// //           background: "#f0fbfb",
// //           padding: "40px",
// //           borderRadius: "20px",
// //           boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
// //           alignItems: "flex-start",
// //         }}
// //       >

// //         {/* AMAZON STYLE LEFT IMAGE AREA */}
// //         <div style={{ display: "flex", gap: "15px" }}>

// //           {/* VERTICAL THUMBNAILS */}
// //           <div
// //             style={{
// //               display: "flex",
// //               flexDirection: "column",
// //               gap: "12px",
// //               maxHeight: "500px",
// //               overflowY: "auto",
// //             }}
// //           >
// //             {productImages.map((img, idx) => (
// //               <img
// //                 key={idx}
// //                 src={img}
// //                 alt={`thumb-${idx}`}
// //                 style={{
// //                   width: "70px",
// //                   height: "70px",
// //                   objectFit: "contain",
// //                   border:
// //                     mainImage === img
// //                       ? "2px solid #007bff"
// //                       : "1px solid #ccc",
// //                   borderRadius: "8px",
// //                   cursor: "pointer",
// //                   background: "#fff",
// //                 }}
// //                 onMouseEnter={() => setMainImage(img)}
// //                 onClick={() => setMainImage(img)}
// //               />
// //             ))}
// //           </div>

// //           {/* BIG IMAGE */}
// //           <div style={{ width: "450px" }}>
// //             <ReactImageMagnify
// //               {...{
// //                 smallImage: {
// //                   alt: product.name,
// //                   isFluidWidth: true,
// //                   src: mainImage,
// //                 },
// //                 largeImage: {
// //                   src: mainImage,
// //                   width: 1200,
// //                   height: 1200,
// //                 },
// //                 enlargedImageContainerDimensions: {
// //                   width: "150%",
// //                   height: "150%",
// //                 },
// //                 hoverDelayInMs: 0,
// //                 hoverOffDelayInMs: 0,
// //               }}
// //             />
// //           </div>
// //         </div>

// //         {/* RIGHT SIDE DETAILS */}
// //         <div style={{ flex: 1 }}>
// //           <h1 style={{ fontSize: "30px", fontWeight: "600" }}>
// //             {product.name}
// //           </h1>

// //           <h2 style={{ marginTop: "20px", fontSize: "26px" }}>
// //             ₹{product.price}
// //           </h2>

// //           <p
// //             style={{
// //               marginTop: "25px",
// //               lineHeight: "1.8",
// //               fontSize: "16px",
// //               color: "#444",
// //             }}
// //           >
// //             {product.description}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
