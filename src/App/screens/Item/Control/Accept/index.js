import React from "react";
import cn from "classnames";
import styles from "./Accept.module.sass";

const items = [
  {
    title: "Service fee",
    value: "0 ETH",
  },
  {
    title: "Total bid amount",
    value: "1.46 ETH",
  },
];

const Accept = ({ className }) => {
  return (
    <div className={cn(className, styles.accept)}>
      <div className={styles.line}>
        <div className={styles.icon}></div>
        <div className={styles.text}>
          You are about to accept a bid for <strong>C O I N Z</strong> from{" "}
          <strong>UI8</strong>
        </div>
      </div>
      <div className={styles.stage}>1.46 ETH for 1 edition</div>
      <div className={styles.table}>
        {items.map((x, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.col}>{x.title}</div>
            <div className={styles.col}>{x.value}</div>
          </div>
        ))}
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)}>Accept bid</button>
        <button className={cn("button-stroke", styles.button)}>Cancel</button>
      </div>
    </div>
  );
};

export default Accept;
