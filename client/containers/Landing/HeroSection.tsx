import Image from "next/image";
import Link from "next/link";
import {
  AnnotationIcon,
  LightningBoltIcon,
  TrendingUpIcon,
} from "@heroicons/react/solid";
import usd from "cryptocurrency-icons/svg/white/usd.svg";
import React from "react";

type ButtonProps = {
  text: string;
  linkTo: string;
  className: string;
};

const Button = (props: ButtonProps) => {
  const { text, linkTo, className } = props;
  return (
    <button className={className}>
      <Link href={linkTo}>
        <a>{text}</a>
      </Link>
    </button>
  );
};

type IconProps = {
  icon: any;
};

function ImageIcon(props: IconProps) {
  return <props.icon className="h-6 w-6" aria-hidden="true" />;
}

const features = [
  {
    name: "Monitor money trends",
    description:
      "Monitor high level in your accounts. Community driven data ",
    icon: <ImageIcon icon={TrendingUpIcon} />,
  },
  {
    name: "Link accounts",
    description:
      "Link any of over a thousand accounts or blockchain networks through Plaid or Zabo.",
    icon: <Image src={usd} height={20} width={20} alt="usd" />,
  },
  {
    name: "Transfers are instant",
    description:
      "Transfer funds from any account to any account easily.",
    icon: <ImageIcon icon={LightningBoltIcon} />,
  },
  {
    name: "Mobile notifications",
    description:
      "Set notifications on to receive account alerts via SMS or email.",
    icon: <ImageIcon icon={AnnotationIcon} />,
  },
];

const HeroSection = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-24">
          <div className="text-base">
            <h1 className="mb-14 text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="xl:inline">All of your accounts</span>{" "}
              <span className="text-tf-blue-dark xl:inline">one place</span>
            </h1>
          </div>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to view money
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Observe all of your accounts. Regardless of if it&apos;s an IRA,
            savings, crypto, or money market account. If it can be linked you
            can view, manage, observe spending trends, and send transfers. All
            in one place.
          </p>
        </div>

        <div className="mt-10 mb-24">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-tf-blue-dark text-white">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-gray-50 mt-9">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to tap in?</span>
            <span className="block text-tf-blue-dark">
              Start your free account today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button
                text="Tap in"
                linkTo={"/signup"}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-tf-blue-dark hover:bg-tf-blue-darker md:py-4 md:text-lg md:px-10"
              />
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-tf-blue-dark bg-white hover:bg-indigo-50"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
