import MobileFooter from "./Front/Components/mobilefooter";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <MobileFooter />
      </body>
    </html>
  );
}
