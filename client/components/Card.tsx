import { ReactNode } from "react";

type Props = {
  title?: string; // Optional header text
  children: ReactNode; // Main content of the card
  footer?: ReactNode; // Optional footer section
  className?: string; // Allow custom styling
};

const Card: React.FC<Props> = ({ title, children, footer, className }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-6 sm:p-8 mx-auto max-w-lg ${
        className || ""
      }`}
    >
      {title && (
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
      )}
      <div className="space-y-4">{children}</div>
      {footer && (
        <div className="mt-6 border-t border-gray-200 pt-4">{footer}</div>
      )}
    </div>
  );
};

export default Card;
