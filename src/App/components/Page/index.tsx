import React, { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";

import Footer from "../Footer";
import Header from "../Header";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";

const Page = ({ children : unknown} ) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
};

export default withRouter(Page);
