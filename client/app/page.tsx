import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import HeroSection from "./HeroSection";

const LandingPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeroSection />
    </div>
  );
};

export default LandingPage;
