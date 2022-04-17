import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  headerText: string;
  informationElement?: ReactNode;
  formContent?: ReactNode;
  helpElement?: ReactNode;
  buttonText: ReactNode;
};

const Card = (props: Props) => {
  const {
    headerText,
    informationElement,
    formContent,
    helpElement,
    buttonText,
  } = props;
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="text-center py-auto">
              <Image
                src="/images/logo.svg"
                alt="Tapfunds Logo"
                width={200}
                height={200}
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {headerText}
            </h2>
            {informationElement}
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            {formContent}
            {helpElement}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-tf-blue-dark hover:bg-tf-blue-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tf-blue"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Card;
