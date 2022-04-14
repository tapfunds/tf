import Image from "next/image";
import { ReactNode } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  Page: ReactNode;
};

const SettingsNav = () => {
  function renderNavItem(title: string) {
    return (
      <li className="relative">
        <a
          className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-tf-blue text-ellipsis whitespace-nowrap rounded hover:text-tf-blue-light hover:bg-sky-100 transition duration-300 ease-in-out"
          href="#!"
          data-mdb-ripple="true"
          data-mdb-ripple-color="dark"
        >
          {title}
        </a>
      </li>
    );
  }

  function renderNav() {
    return (
      <div
        className="w-60 h-full shadow-md bg-white absolute"
        id="settings-nav"
      >
        <div className="pt-4 pb-2 px-6 flex items-center ">
          <a href="#!">
            <div className="flex items-center">
              <div className="grow ml-3">
                <p className="text-sm font-semibold text-tf-blue-dark">
                  Settings
                </p>
              </div>
            </div>
          </a>
        </div>
        <ul className="relative">{renderNavItem("Profile")}</ul>
        <ul className="relative">{renderNavItem("Bank Connections")}</ul>
        <ul className="relative">{renderNavItem("Security")}</ul>
        <ul className="relative">{renderNavItem("Notifications")}</ul>
        <ul className="relative">{renderNavItem("Statements")}</ul>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          {renderNav()}
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};

export default SettingsNav;
