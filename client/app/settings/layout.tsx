import { ReactNode } from "react";
import Link from "next/link";

const navigation = [
  { name: "Profile", href: "/settings/profile", current: false },
  { name: "Integrations", href: "/settings/integrations", current: false },
  { name: "Statements", href: "/settings/statements", current: false },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
  function renderNav() {
    return (
      <div className="w-60 h-full shadow-md bg-white flex flex-col">
        <div className="pt-4 pb-2 px-6 flex items-center">
          <Link href="/settings" passHref>
            <div className="text-xl font-semibold text-tf-blue-dark">
              Settings
            </div>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          {navigation.map((item) => (
            <ul key={item.name} className="relative px-3 py-2 font-medium">
              <li className="relative">
                <Link
                  href={item.href}
                  className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-tf-blue text-ellipsis whitespace-nowrap rounded hover:text-tf-blue-light hover:bg-sky-100 transition duration-300 ease-in-out"
                >
                  {item.name}
                </Link>
              </li>
            </ul>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <header>{renderNav()}</header>
      <main className="flex-grow m-5">{children}</main>
    </div>
  );
}
