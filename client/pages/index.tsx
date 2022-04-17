import type { NextPage } from "next";

import { LandingContainer } from "../containers";

import styles from "../styles/Home.module.css";

const LandingPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <LandingContainer/>
    </div>
  );
};

export default LandingPage;
