import "../styles/globals.css";
import { SignedInNav } from "@/components/Navigation/SignedInNav";
import { SignedOutNav } from "@/components/Navigation/SignedOutNav";
import { getUser } from "@/lib/dal";
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
  const user = await getUser();

  return (
    <html lang="en">
      <body>
        {user ? <SignedInNav /> : <SignedOutNav />}
        {children}
      </body>
    </html>
  );
}
