import Footer from "./Components/Footer";
import Header from "./Components/Header";

// app/Front/layout.tsx
export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
