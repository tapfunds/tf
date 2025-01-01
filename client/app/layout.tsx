import "../styles/globals.css";
import Navbar from "./components/Navigation/Navbar";

export const metadata = {
  title: "Tapfunds",
  description: "Modern Banking Solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
