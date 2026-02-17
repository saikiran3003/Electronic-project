// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function LogoutPage() {
//   const router = useRouter();

//   const [ready, setReady] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     setReady(true);
//   }, []);

//   const handleLogout = async () => {
//     if (loading) return;

//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/logout", {
//         method: "POST",
//         cache: "no-store",
//       });

//       if (!res.ok) throw new Error("Logout failed");

//       setSuccess(true);

//       setTimeout(() => {
//         router.replace("/admin/login");
//       }, 1200);
//     } catch {
//       alert("Logout failed ❌");
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     router.replace("/admin");
//   };

//   if (!ready) return null;

//   return (
//     <div className="overlay">
//       {!success && (
//         <div className="modal">
//           <h2>Confirm Logout</h2>
//           <p>Are you sure you want to logout?</p>

//           <div className="buttons">
//             <button className="cancel" onClick={handleCancel}>
//               Cancel
//             </button>

//             <button
//               className="confirm"
//               onClick={handleLogout}
//               disabled={loading}
//             >
//               {loading ? "Logging out..." : "Yes, Logout"}
//             </button>
//           </div>
//         </div>
//       )}

//       {success && (
//         <div className="modal success">
//           <h2>Logout Successful ✅</h2>
//           <p>Redirecting...</p>
//         </div>
//       )}

//       <style jsx>{`
//         .overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.45);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 999;
//         }

//         .modal {
//           background: white;
//           padding: 30px;
//           width: 360px;
//           border-radius: 14px;
//           text-align: center;
//           box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
//         }

//         .buttons {
//           display: flex;
//           gap: 12px;
//         }

//         button {
//           flex: 1;
//           padding: 11px;
//           border: none;
//           border-radius: 7px;
//           cursor: pointer;
//           font-weight: 600;
//         }

//         .cancel {
//           background: #e5e7eb;
//         }

//         .confirm {
//           background: #e11d48;
//           color: white;
//         }

//         .success {
//           border-top: 6px solid #22c55e;
//         }
//       `}</style>
//     </div>
//   );
// }



"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const logoutTriggered = useRef(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [closing, setClosing] = useState(false); // 🔥 controls unmount

  // =========================
  // LOGOUT (only when confirmed)
  // =========================
  const handleLogout = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (logoutTriggered.current) return;

    logoutTriggered.current = true;
    setLoading(true);

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Logout failed");

      setSuccess(true);

      setTimeout(() => {
        router.replace("/admin/login");
      }, 1000);
    } catch {
      alert("Logout failed ❌");
      logoutTriggered.current = false;
      setLoading(false);
    }
  };

  // =========================
  // CANCEL (never logs out)
  // =========================
  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setClosing(true); // unmount modal first

    setTimeout(() => {
      router.replace("/admin/dashboard");
    }, 100);
  };

  // If closing → render nothing → forces route exit
  if (closing) return null;

  return (
    <div className="overlay">
      {!success && (
        <div className="modal">
          <h2>Confirm Logout</h2>
          <p>Are you sure you want to logout?</p>

          <div className="buttons">
            <button
              type="button"
              className="cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="button"
              className="confirm"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "Logging out..." : "Yes, Logout"}
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="modal success">
          <h2>Logout Successful ✅</h2>
          <p>Redirecting...</p>
        </div>
      )}

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal {
          background: white;
          padding: 30px;
          width: 360px;
          border-radius: 14px;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
          animation: fadeIn 0.2s ease;
        }

        .buttons {
          display: flex;
          gap: 12px;
        }

        button {
          flex: 1;
          padding: 11px;
          border: none;
          border-radius: 7px;
          cursor: pointer;
          font-weight: 600;
        }

        .cancel {
          background: #e5e7eb;
        }

        .cancel:hover {
          background: #d1d5db;
        }

        .confirm {
          background: #e11d48;
          color: white;
        }

        .confirm:hover {
          background: #be123c;
        }

        .success {
          border-top: 6px solid #22c55e;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
