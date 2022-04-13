import React from "react";
import Link from "next/link";

type Props = {
  text: string;
  linkTo: string;
};

const Button = (props: Props) => {
  const { text, linkTo } = props;
  return (
    <button className="px-6 py-2 bg-tf-blue">
      <Link href={linkTo}>{text}</Link>
    </button>
  );
};

export default Button;
