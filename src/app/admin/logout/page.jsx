"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
    const router = useRouter();
    const [showConfirm, setShowConfirm] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });

            setShowConfirm(false);
            setShowSuccess(true);

            setTimeout(() => {
                router.replace("/admin/login");
            }, 1500);
        } catch (error) {
            alert("Logout failed");
        }
    };

    const handleCancel = () => {
        router.replace("/admin");
    };

    return (
        <div className="overlay">
            {showConfirm && (
                <div className="modal">
                    <h2>Confirm Logout</h2>
                    <p>Are you sure you want to logout?</p>

                    <div className="buttons">
                        <button className="cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="confirm" onClick={handleLogout}>
                            Yes, Logout
                        </button>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="modal success">
                    <h2>Logout Successful ✅</h2>
                    <p>Redirecting to login...</p>
                </div>
            )}

            <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal {
          background: white;
          padding: 30px;
          width: 350px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          animation: fadeIn 0.3s ease;
        }

        .modal h2 {
          margin-bottom: 15px;
        }

        .modal p {
          margin-bottom: 25px;
          color: #555;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
        }

        button {
          padding: 10px 18px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: 0.3s;
        }

        .cancel {
          background: #ccc;
        }

        .cancel:hover {
          background: #999;
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
