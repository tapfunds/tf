import type { NextPage } from "next";

import Image from "next/image";
import Link from "next/link";

import { Header } from "../components";

import styles from "../styles/Home.module.css";

type Props = {
  text: string;
  linkTo: string;
};

const Button = (props: Props) => {
  const { text, linkTo } = props;
  return (
    <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-tf-blue">
      <Link href={linkTo}>
        <a>{text}</a>
      </Link>
    </button>
  );
};

const LandingPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Learn <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div>
          <Button text="Tap in" linkTo={"/login"} />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/logo.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
