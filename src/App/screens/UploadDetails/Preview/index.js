import React from "react";
import cn from "classnames";
import styles from "./Preview.module.sass";
import Icon from "../../../components/Icon";

const Preview = ({ className, onClose }) => {
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={styles.inner}>
        <button className={styles.close} onClick={onClose}>
          <Icon name="close" size="14" />
        </button>
        <div className={styles.info}>Preview</div>
        <div className={styles.card}>
          <div className={styles.preview}>
            <img
              srcSet="/images/content/card-pic-6.jpg"
              src="/images/content/card-pic-6@2x.jpg"
              alt="Card"
            />
          </div>
          <div className={styles.link}>
            <div className={styles.body}>
              <div className={styles.line}>
                <div className={styles.title}>Black Golden Tiger</div>
                <div className={styles.price}>2.45 ETH</div>
              </div>
              <div className={styles.line}>
                <div className={styles.users}>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-1.jpg" alt="Avatar" />
                  </div>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-3.jpg" alt="Avatar" />
                  </div>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-4.jpg" alt="Avatar" />
                  </div>
                </div>
                <div className={styles.counter}>3 in stock</div>
              </div>
            </div>
            <div className={styles.foot}>
              <div className={styles.status}>
                <Icon name="candlesticks-up" size="20" />
                Highest bid <span>0.001 ETH</span>
              </div>
              <div className={styles.bid}>
                New bid
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.clear}>
          <Icon name="circle-close" size="24" />
          Clear all
        </button>
      </div>
    </div>
  );
};

export default Preview;
