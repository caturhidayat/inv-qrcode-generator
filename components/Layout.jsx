import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-2">{children}</div>
    </>
  );
}
