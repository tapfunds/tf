import "../styles/globals.css";
import { SignedInNav } from "@/components/Navigation/SignedInNav";
import { SignedOutNav } from "@/components/Navigation/SignedOutNav";
import { verifySession } from "@/lib/session";

export const metadata = {
  title: "Tapfunds",
  description: "Modern Banking Solution",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  const userPresent = !!session?.userId; // Assuming 'role' is part of the session object

  return (
    <html lang="en">
      <body>
        {userPresent ? <SignedInNav /> : <SignedOutNav />}
        {children}
      </body>
    </html>
  );
}
