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
      <link rel="shortcut icon" href="/iconplenty.png" type="image/x-icon" />

      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
