import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../globals.css";

export default function LandingLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        <main style={{ minHeight: "80vh" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
