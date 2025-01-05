import "../styles/globals.css";
import SignedInNav from "./components/Navigation/SignedInNav";
import SignedOutNav from "./components/Navigation/SignedOutNav";

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
        <SignedOutNav />
        <SignedInNav />
        {children}
      </body>
    </html>
  );
}
