"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-red-500 border-b border-gray-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <button
          onClick={() => router.push("/home")}
          className="text-lg font-semibold hover:opacity-80"
        >
          <h1>Electronic Gadgets</h1>
        </button>

        {/* Navigation */}
        <div className="flex gap-10 text-sm tracking-widest uppercase">
          <button
            onClick={() => router.push("/home")}
            className="hover:opacity-70"
          >
            Home
          </button>

          <button
            onClick={() => router.push("/about")}
            className="hover:opacity-70"
          >
            About
          </button>

          <button
            onClick={() => router.push("/products")}
            className="hover:opacity-70"
          >
            Products
          </button>






          <button
            onClick={() => router.push("/contact")}
            className="hover:opacity-70"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
