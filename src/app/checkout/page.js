// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CheckoutPage() {
//     const router = useRouter();
//     const [product, setProduct] = useState(null);
//     const [selectedMethod, setSelectedMethod] = useState("");
//     const [showPinScreen, setShowPinScreen] = useState(false);
//     const [upiPin, setUpiPin] = useState("");
//     const [showPin, setShowPin] = useState(false);
//     const [processing, setProcessing] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const selectedProduct = localStorage.getItem("selectedProduct");

//         if (!token) {
//             router.push("/user/login");
//             return;
//         }

//         if (!selectedProduct) {
//             router.push("/products");
//             return;
//         }

//         setProduct(JSON.parse(selectedProduct));
//     }, []);

//     const openPinScreen = (method) => {
//         setSelectedMethod(method);
//         setShowPinScreen(true);
//     };

//     const addDigit = (num) => {
//         if (upiPin.length < 6) {
//             setUpiPin(upiPin + num);
//         }
//     };

//     const removeDigit = () => {
//         setUpiPin(upiPin.slice(0, -1));
//     };

//     const handlePayment = async () => {
//         if (upiPin.length !== 6) {
//             alert("Enter valid 6-digit UPI PIN");
//             return;
//         }

//         setProcessing(true);

//         try {
//             const token = localStorage.getItem("token");
//             const userName = localStorage.getItem("userName");
//             const userEmail = localStorage.getItem("userEmail");

//             const response = await fetch("/api/payment", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     productName: product.name,
//                     productId: product._id,
//                     price: product.price,
//                     paymentMethod: selectedMethod,
//                     userToken: token,
//                     email: userEmail,
//                     fullName: userName,
//                     status: "Success",
//                     upiPin: upiPin,
//                 }),
//             });

//             const data = await response.json();

//             if (data.success) {
//                 alert("Payment Successful ✅");
//                 localStorage.removeItem("selectedProduct");
//                 router.push("/products");
//             } else {
//                 alert("Payment Failed: " + data.error);
//             }
//         } catch (error) {
//             console.error(error);
//             alert("Something went wrong during payment");
//         } finally {
//             setProcessing(false);
//         }
//     };

//     if (!product) return null;

//     return (
//         <div style={container}>

//             {!showPinScreen ? (
//                 <>
//                     <h2 style={title}>Checkout</h2>

//                     <div style={productCard}>
//                         <img
//                             src={product.image || "https://via.placeholder.com/120"}
//                             alt={product.name}
//                             style={productImage}
//                         />
//                         <div>
//                             <h3>{product.name}</h3>
//                             <p style={{ color: "#555" }}>{product.description}</p>
//                             <h2 style={{ color: "#2563eb" }}>₹{product.price}</h2>
//                         </div>
//                     </div>

//                     <h3 style={{ marginTop: "30px" }}>Select UPI Method</h3>

//                     <div style={paymentBox} onClick={() => openPinScreen("Google Pay")}>
//                         <img src="assets/images/gpay.png" style={logoStyle} />
//                         Google Pay
//                     </div>

//                     <div style={paymentBox} onClick={() => openPinScreen("PhonePe")}>
//                         <img src="assets/images/phonepe.png" style={logoStyle} />
//                         PhonePe
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     {/* ===== UPI PIN SCREEN ===== */}

//                     {/* Header */}
//                     <div style={bankHeader}>
//                         <span>UPI</span>
//                     </div>

//                     {/* PIN Section */}
//                     <div style={pinSection}>
//                         <div style={pinTitleRow}>
//                             <span>ENTER UPI PIN</span>
//                             <span
//                                 style={{ color: "#1d4ed8", cursor: "pointer" }}
//                                 onClick={() => setShowPin(!showPin)}
//                             >
//                                 {showPin ? "HIDE" : "SHOW"}
//                             </span>
//                         </div>

//                         {/* PIN Dashes */}
//                         <div style={pinBoxes}>
//                             {[0, 1, 2, 3, 4, 5].map((i) => (
//                                 <div key={i} style={dash}>
//                                     {upiPin[i]
//                                         ? (showPin ? upiPin[i] : "•")
//                                         : ""}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Keypad */}
//                     <div style={keypad}>
//                         {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
//                             <div
//                                 key={num}
//                                 style={key}
//                                 onClick={() => addDigit(num.toString())}
//                             >
//                                 {num}
//                             </div>
//                         ))}

//                         <div style={key} onClick={removeDigit}>⌫</div>
//                         <div style={key} onClick={() => addDigit("0")}>0</div>
//                         <div style={submitKey} onClick={handlePayment}>
//                             {processing ? "..." : "SUBMIT"}
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// /* ================== STYLES ================== */

// const container = {
//     maxWidth: "400px",
//     margin: "auto",
//     fontFamily: "Arial",
//     background: "#f5f5f5",
//     minHeight: "100vh",
// };

// const title = {
//     textAlign: "center",
//     padding: "20px",
// };

// const productCard = {
//     display: "flex",
//     gap: "15px",
//     background: "#fff",
//     padding: "15px",
//     borderRadius: "12px",
//     margin: "10px",
// };

// const productImage = {
//     width: "100px",
//     height: "100px",
//     objectFit: "cover",
//     borderRadius: "10px",
// };

// const paymentBox = {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     background: "#fff",
//     margin: "10px",
//     padding: "15px",
//     borderRadius: "10px",
//     cursor: "pointer",
// };

// const logoStyle = {
//     width: "30px",
// };

// const bankHeader = {
//     background: "#1e3a8a",
//     color: "white",
//     padding: "15px",
//     display: "flex",
//     justifyContent: "space-between",
//     fontWeight: "600",
// };

// const pinSection = {
//     padding: "40px 20px",
//     textAlign: "center",
// };

// const pinTitleRow = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     marginBottom: "30px",
//     fontWeight: "600",
// };

// const pinBoxes = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "15px",
// };

// const dash = {
//     width: "25px",
//     height: "30px",
//     borderBottom: "3px solid #555",
//     textAlign: "center",
//     fontSize: "20px",
// };

// const keypad = {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     background: "#e5e5e5",
// };

// const key = {
//     padding: "25px",
//     textAlign: "center",
//     fontSize: "22px",
//     border: "1px solid #ccc",
//     cursor: "pointer",
//     background: "#fff",
// };

// const submitKey = {
//     padding: "25px",
//     textAlign: "center",
//     fontSize: "18px",
//     border: "1px solid #ccc",
//     cursor: "pointer",
//     background: "#f3f4f6",
//     fontWeight: "600",
// };


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [showPinScreen, setShowPinScreen] = useState(false);
    const [upiPin, setUpiPin] = useState("");
    const [showPin, setShowPin] = useState(false);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const selectedProduct = localStorage.getItem("selectedProduct");

        if (!token) {
            router.push("/user/login");
            return;
        }

        if (!selectedProduct) {
            router.push("/products");
            return;
        }

        setProduct(JSON.parse(selectedProduct));
    }, []);

    const openPinScreen = (method) => {
        setSelectedMethod(method);
        setShowPinScreen(true);
    };

    const addDigit = (num) => {
        if (upiPin.length < 6) {
            setUpiPin((prev) => prev + num);
        }
    };

    const removeDigit = () => {
        setUpiPin((prev) => prev.slice(0, -1));
    };

    // ✅ ACTUAL PAYMENT HANDLER (STORES IN DATABASE)
    const handlePayment = async () => {
        if (upiPin.length !== 6) {
            alert("Enter valid 6-digit UPI PIN");
            return;
        }

        setProcessing(true);

        try {
            const token = localStorage.getItem("token");
            const userName = localStorage.getItem("userName");
            const userEmail = localStorage.getItem("userEmail");

            const response = await fetch("/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productName: product.name,
                    productId: product._id,
                    price: product.price,
                    paymentMethod: selectedMethod,
                    userToken: token,
                    email: userEmail,
                    fullName: userName,
                    status: "Success",
                    upiPin: upiPin,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Payment Successful ✅");
                localStorage.removeItem("selectedProduct");
                router.push("/products");
            } else {
                alert("Payment Failed: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong during payment ❌");
        } finally {
            setProcessing(false);
        }
    };

    if (!product) return null;

    return (
        <div style={container}>
            {!showPinScreen ? (
                <>
                    <h2 style={title}>Checkout</h2>

                    <div style={productCard}>
                        <img
                            src={product.image || "https://via.placeholder.com/120"}
                            alt={product.name}
                            style={productImage}
                        />
                        <div>
                            <h3>{product.name}</h3>
                            <p style={{ color: "#555" }}>{product.description}</p>
                            <h2 style={{ color: "#2563eb" }}>₹{product.price}</h2>
                        </div>
                    </div>

                    <h3 style={{ marginTop: "30px" }}>Select UPI Method</h3>

                    <div style={paymentBox} onClick={() => openPinScreen("Google Pay")}>
                        <img src="/assets/images/gpay.png" style={logoStyle} />
                        Google Pay
                    </div>

                    <div style={paymentBox} onClick={() => openPinScreen("PhonePe")}>
                        <img src="/assets/images/phonepe.png" style={logoStyle} />
                        PhonePe
                    </div>
                </>
            ) : (
                <>
                    {/* HEADER */}
                    <div style={bankHeader}>
                        <span>UPI</span>
                    </div>

                    {/* PIN SECTION */}
                    <div style={pinSection}>
                        <div style={pinTitleRow}>
                            <span>ENTER UPI PIN</span>
                            <span
                                style={{ color: "#1d4ed8", cursor: "pointer" }}
                                onClick={() => setShowPin(!showPin)}
                            >
                                {showPin ? "HIDE" : "SHOW"}
                            </span>
                        </div>

                        <div style={pinBoxes}>
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                <div key={i} style={dash}>
                                    {upiPin[i] ? (showPin ? upiPin[i] : "•") : ""}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* KEYPAD */}
                    <div style={keypad}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <div
                                key={num}
                                style={key}
                                onClick={() => addDigit(num.toString())}
                            >
                                {num}
                            </div>
                        ))}

                        <div style={key} onClick={removeDigit}>⌫</div>
                        <div style={key} onClick={() => addDigit("0")}>0</div>

                        <div style={submitKey} onClick={handlePayment}>
                            {processing ? "Processing..." : "SUBMIT"}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

/* ================== STYLES ================== */

const container = {
    maxWidth: "400px",
    margin: "auto",
    fontFamily: "Arial",
    background: "#f5f5f5",
    minHeight: "100vh",
};

const title = {
    textAlign: "center",
    padding: "20px",
};

const productCard = {
    display: "flex",
    gap: "15px",
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    margin: "10px",
};

const productImage = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
};

const paymentBox = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff",
    margin: "10px",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer",
};

const logoStyle = {
    width: "30px",
};

const bankHeader = {
    background: "#1e3a8a",
    color: "white",
    padding: "15px",
    fontWeight: "600",
};

const pinSection = {
    padding: "40px 20px",
    textAlign: "center",
};

const pinTitleRow = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
    fontWeight: "600",
};

const pinBoxes = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
};

const dash = {
    width: "25px",
    height: "30px",
    borderBottom: "3px solid #555",
    textAlign: "center",
    fontSize: "20px",
};

const keypad = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    background: "#e5e5e5",
};

const key = {
    padding: "25px",
    textAlign: "center",
    fontSize: "22px",
    border: "1px solid #ccc",
    cursor: "pointer",
    background: "#fff",
};

const submitKey = {
    padding: "25px",
    textAlign: "center",
    fontSize: "18px",
    border: "1px solid #ccc",
    cursor: "pointer",
    background: "#f3f4f6",
    fontWeight: "600",
};
