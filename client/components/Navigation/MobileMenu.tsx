"use client";

import Link from "next/link";

interface MobileMenuProps {
  links: { name: string; href: string; current: boolean }[];
  isOpen: boolean; // Add isOpen prop
}

export const MobileMenu = ({ links, isOpen }: MobileMenuProps) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`${
              link.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
