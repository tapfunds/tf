"use client";

import Link from "next/link";

interface NavLink {
  name: string;
  href: string;
  current: boolean;
}

interface NavLinksProps {
  links: NavLink[];
}

export const NavLinks = ({ links }: NavLinksProps) => {
  return (
    <div className="hidden sm:block sm:ml-6">
      <div className="flex space-x-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`${
              link.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
