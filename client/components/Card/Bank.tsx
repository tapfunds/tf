import React from "react";

type Props = {
  name: string;
  color: string;
};
const BankCard = (props: Props) => {
  const { name, color } = props;
  return (
    <div className={`bg-[${color}] py-6 flex-1 flex-col justify-start sm:py-9`}>
      <div
        style={{ width: "55%" }}
        className="relative  sm:max-w-xl sm:mx-auto "
      >
        <div className="absolute inset-0 shadow-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 sm:rounded-3xl"></div>
        <div className="relative sm:p-20">
          <h1 className="max-w-md mx-auto">{name}</h1>
        </div>
      </div>
    </div>
  );
};

export default BankCard;
