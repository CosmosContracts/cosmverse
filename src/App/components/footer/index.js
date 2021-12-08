import React, { useState } from "react";

import Form from "../Form";
import Group from "./Group";
import Image from "../Image";
import { Link } from "react-router-dom";
import Theme from "../Theme";
import cn from "classnames";
import styles from "./Footer.module.sass";

const items = [
  {
    title: "Marketplace",
    menu: [
      {
        title: "Discover",
        url: "/search01",
      },
      {
        title: "Connect wallet",
        url: "/connect-wallet",
      },
    ],
  },
  {
    title: "My Account",
    menu: [
      {
        title: "Profile",
        url: "/profile",
      },
      {
        title: "My NFTS",
        url: "/upload-variants",
      },
    ],
  },
  {
    title: "Resources",
    menu: [
      {
        title: "Connect Wallet",
        url: "/faq",
      },
      {
        title: "Mint NFT",
        url: "/upload-variants",
      },
    ],
  },
];

const Footers = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <footer className={styles.footer}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Link className={styles.logo} to="/">
              <Image
                className={styles.pic}
                src="/images/logo-dark.png"
                srcDark="/images/logo-light.png"
                alt="Cosmverse Logo"
              />
            </Link>
            <div className={styles.info}>Cross-chain NFT marketplace on JunoNetwork.</div>
            <div className={styles.version}>
              <div className={styles.details}>Dark theme</div>
              <Theme className="theme-big" />
            </div>
          </div>
          <div className={styles.col}>
            {items.map((x, index) => (
              <Group className={styles.group} item={x} key={index} />
            ))}
          </div>
           <div className={styles.col}>
            {/* <div className={styles.category}>Join Newsletter</div>
            <div className={styles.text}>
              Subscribe our newsletter to get more free design course and
              resource
            </div>
            <Form
              className={styles.form}
              value={email}
              setValue={setEmail}
              onSubmit={() => handleSubmit()}
              placeholder="Enter your email"
              type="email"
              name="email"
            /> */}
          </div> 
        </div>
        <div className={styles.foot}>
          <div className={styles.copyright}>
            Copyright © 2021 Cosmverse. All rights reserved
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footers;
