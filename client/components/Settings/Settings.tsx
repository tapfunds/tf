import Image from "next/image";

const Settings = () => {
  return (
    <div
      className="w-60 h-full shadow-md bg-white absolute"
      id="settings-nav"
    >
      <div className="pt-4 pb-2 px-6">
        <a href="#!">
          <div className="flex items-center">
            <div className="shrink-0">
              <Image
                src="/logo.svg"
                className="rounded-full w-10"
                alt="Avatar"
                width={100}
                height={100}
              />
            </div>
            <div className="grow ml-3">
              <p className="text-sm font-semibold text-blue-600">
                Jason McCoel
              </p>
            </div>
          </div>
        </a>
      </div>
      <ul className="relative">
        <li className="relative">
          <a
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-tf-blue text-ellipsis whitespace-nowrap rounded hover:text-tf-blue-light hover:bg-sky-100 transition duration-300 ease-in-out"
            href="#!"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            Sidenav link 1
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
