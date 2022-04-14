import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  Page: ReactNode
}

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

  return (
    <div className="w-60 h-full shadow-md bg-white absolute" id="settings-nav">
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
};

export default SettingsNav;
