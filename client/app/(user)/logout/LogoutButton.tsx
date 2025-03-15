import { logout } from "./logout";

export function LogoutButton() {
  return (
    <button
      onClick={logout}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
    >
      Logout
    </button>
  );
}
