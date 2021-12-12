import React from "react";
import cn from "classnames";
import styles from "./Followers.module.sass";
import Loader from "../../../components/Loader";

const Followers = ({ className, items }) => {
  return (
    <div className={cn(styles.followers, className)}>
      <div className={styles.list}>
        {items.map((x, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.follower}>
              <div className={styles.avatar}>
                <img src={x.avatar} alt="Avatar" />
              </div>
              <div className={styles.details}>
                <div className={styles.title}>{x.name}</div>
                <div className={styles.counter}>{x.counter}</div>
                <a
                  className={cn(
                    { "button-small": x.buttonClass === "blue" },
                    {
                      "button-stroke button-small": x.buttonClass === "stroke",
                    },
                    styles.button
                  )}
                  href={x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {x.buttonContent}
                </a>
              </div>
            </div>
            <div className={styles.wrap}>
              <div className={styles.gallery}>
                {x.gallery.map((x, index) => (
                  <div className={styles.preview} key={index}>
                    <img src={x} alt="Follower" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Loader className={styles.loader} />
    </div>
  );
};

export default Followers;
