import { useTransition } from "react";
import { logoutAction } from "./action";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logoutAction();
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      disabled={isPending}
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
