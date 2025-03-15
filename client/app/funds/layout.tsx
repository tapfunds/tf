// layout.tsx (or _app.tsx if wrapping around the whole app)
import UserContext from "../../lib/context/UserContext";
import { getUser } from "../../lib/dal";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser(); // fetch the user from the API

  return (
    <html lang="en">
      <body>
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
      </body>
    </html>
  );
}
