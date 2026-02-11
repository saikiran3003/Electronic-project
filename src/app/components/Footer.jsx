export default function Footer() {
  return (
    <footer
      style={{
        padding: 20,
        textAlign: "center",
        background: "red",
        marginTop: 40,
      }}
    >
      © {new Date().getFullYear()} Electronic Project. All rights reserved.
    </footer>
  );
}
