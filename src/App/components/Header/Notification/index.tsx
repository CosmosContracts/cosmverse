import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Notification.module.sass";
import Icon from "../../Icon";

const items = [
  {
    title: "ETH received",
    price: "0.08 ETH recived",
    date: "2 days ago",
    color: "#3772FF",
    image: "/images/content/notification-pic-1.jpg",
    url: "/activity",
  },
  {
    title: "C O I N Z",
    price: "New bid 0.2 ETH",
    date: "3 days ago",
    color: "#3772FF",
    image: "/images/content/notification-pic-2.jpg",
    url: "/activity",
  },
  {
    title: "ETH received",
    price: "0.08 ETH recived",
    date: "4 days ago",
    color: "#3772FF",
    image: "/images/content/notification-pic-3.jpg",
    url: "/activity",
  },
  {
    title: "ETH received",
    price: "0.08 ETH recived",
    date: "5 days ago",
    color: "#3772FF",
    image: "/images/content/notification-pic-4.jpg",
    url: "/activity",
  },
];

const Notification = ({ className }) => {
  const [visible, setVisible] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.notification, className)}>
        <button
          className={cn(styles.head, styles.active)}
          onClick={() => setVisible(!visible)}
        >
          <Icon name="notification" size="24" />
        </button>
        {visible && (
          <div className={styles.body}>
            <div className={cn("h4", styles.title)}>Notification</div>
            <div className={styles.list}>
              {items.map((x, index) => (
                <Link
                  className={styles.item}
                  to={x.url}
                  onClick={() => setVisible(!visible)}
                  key={index}
                >
                  <div className={styles.preview}>
                    <img src={x.image} alt="Notification" />
                  </div>
                  <div className={styles.details}>
                    <div className={styles.subtitle}>{x.title}</div>
                    <div className={styles.price}>{x.price}</div>
                    <div className={styles.date}>{x.date}</div>
                  </div>
                  <div
                    className={styles.status}
                    style={{ backgroundColor: x.color }}
                  ></div>
                </Link>
              ))}
            </div>
            <Link
              className={cn("button-small", styles.button)}
              to="/activity"
              onClick={() => setVisible(!visible)}
            >
              See all
            </Link>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default Notification;
