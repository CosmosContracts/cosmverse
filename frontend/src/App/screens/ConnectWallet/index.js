import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./ConnectWallet.module.sass";
import Icon from "../../components/Icon";
import Checkbox from "../../components/Checkbox";

const menu = [
  {
    title: "Coinbase Wallet",
    color: "#9757D7",
  },
  {
    title: "Coinbase Wallet",
    color: "#3772FF",
  },
  {
    title: "MyEtherWallet",
    color: "#45B26B",
  },
  {
    title: "Wallet Connect",
    color: "#EF466F",
  },
];

const Connect = () => {
  const [age, setAge] = useState(true);
  const [conditions, setConditions] = useState(false);

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <Link className={styles.back} to="/">
            <Icon name="arrow-prev" size="24" />
            <div className={cn("h2", styles.stage)}>Connect your wallet</div>
          </Link>
        </div>
        <div className={styles.body}>
          <div className={styles.menu}>
            {menu.map((x, index) => (
              <div
                className={cn({ [styles.active]: index === 1 }, styles.link)}
                key={index}
              >
                <div
                  className={styles.icon}
                  style={{ backgroundColor: x.color }}
                >
                  <Icon name="wallet" size="24" />
                  <Icon name="check" size="18" fill={x.color} />
                </div>
                <span>{x.title}</span>
                <div className={styles.arrow}>
                  <Icon name="arrow-next" size="14" />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.bg}>
              <img
                srcSet="/images/content/connect-bg@2x.jpg 2x"
                src="/images/content/connect-bg.jpg"
                alt="Connect wallet"
              />
            </div>
            <div className={styles.item}>
              <div className={cn("h3", styles.title)}>Scan to connect</div>
              <div className={styles.text}>Powered by UI8.Wallet</div>
              <div className={styles.box}>
                <div className={styles.code}>
                  <img src="/images/content/qr-code.png" alt="Qr-code" />
                </div>
              </div>
              <button className={cn("button-stroke", styles.button)}>
                Don’t have a wallet app?
              </button>
            </div>
            <div className={styles.item}>
              <div className={cn("h3", styles.title)}>Terms of service</div>
              <div className={styles.text}>
                Please take a few minutes to read and understand{" "}
                <span>Stacks Terms of Service</span>. To continue, you’ll need
                to accept the terms of services by checking the boxes.
              </div>
              <div className={styles.preview}>
                <img
                  srcSet="/images/content/connect-pic@2x.jpg 2x"
                  src="/images/content/connect-pic.jpg"
                  alt="Connect wallet"
                />
              </div>
              <div className={styles.variants}>
                <Checkbox
                  className={styles.checkbox}
                  value={age}
                  onChange={() => setAge(!age)}
                  content="I am at least 13 year old"
                />
                <Checkbox
                  className={styles.checkbox}
                  value={conditions}
                  onChange={() => setConditions(!conditions)}
                  content="I agree Stack terms of service"
                />
              </div>
              <div className={styles.btns}>
                <button className={cn("button-stroke", styles.button)}>
                  Cancel
                </button>
                <button className={cn("button", styles.button)}>
                  Get started now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
