"use client";

import { useState } from "react";
import Link from "next/link";

interface DropdownItem {
  name: string;
  href: string;
}

interface DropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
}

export const Dropdown = ({ items, isOpen }: DropdownProps) => {
  return (
    <div
      className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
        isOpen ? "block" : "hidden"
      }`}
      role="menu"
    >
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
