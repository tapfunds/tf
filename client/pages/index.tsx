import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import HeroSection from "./HeroSection";
import Header from "./Header";

const LandingPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header headerText="Tapfunds" />
      <HeroSection />
    </div>
  );
};

export default LandingPage;
