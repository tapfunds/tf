import { ReactNode } from "react";
import Link from "next/link";

const navigation = [
  { name: "Profile", href: "/settings/profile", current: true },
  { name: "Integrations", href: "/settings/integrations", current: false },
  { name: "Statements", href: "/settings/statements", current: false },
];

type Props = {
  pageContent: ReactNode;
};

const SettingsFrame = (props: Props) => {
  const { pageContent } = props;
  function renderNav() {
    return (
      <div
        className="w-60 h-full shadow-md bg-white flex flex-col"
        id="settings-nav"
      >
        <div className="pt-4 pb-2 px-6 flex items-center">
          <Link href="#!" passHref={true}>
            <div className="flex items-center">
              <div className="grow ml-3">
                <p className="text-xl font-semibold text-tf-blue-dark">
                  Settings
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          {navigation.map((item) => (
            <ul key={item.name} className="relative px-3 py-2 font-medium">
              <li className="relative">
                <Link
                  href={item.href}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
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
    <div className="flex flex-row min-h-full">
      <header>{renderNav()}</header>
      <main>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <div className="py-6 px-4">{pageContent}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsFrame;
