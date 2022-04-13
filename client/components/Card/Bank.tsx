import React from "react";

type Props = {
  name: string;
  color: string;
};
const BankCard = (props: Props) => {
  const { name, color } = props;
  return (
    <div className=" py-6 flex-1 flex-col justify-start sm:py-9">
      <div
        style={{ width: "45%", height: "12%" }}
        className={`relative sm:mx-auto inset-0 shadow-lg bg-[${color}] sm:rounded-3xl`}
      >
        <div className="relative sm:p-20">
          <h1 className="max-w-md mx-auto">{name}</h1>
        </div>
      </div>
    </div>
  );
};

export default BankCard;
