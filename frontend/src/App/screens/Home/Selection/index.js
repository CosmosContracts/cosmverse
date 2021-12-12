import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Selection.module.sass";
import Icon from "../../../components/Icon";

const items = [
  {
    title: "The future of ETH®",
    content: "Highest bid",
    counter: "18 in stock",
    price: "1.125 ETH",
    url: "/item",
    avatar: "/images/content/avatar-1.jpg",
    image: "/images/content/selection-pic-1.jpg",
    image2x: "/images/content/selection-pic-1@2x.jpg",
  },
  {
    title: "ETH never die",
    content: "1 of 12",
    price: "0.27 ETH",
    url: "/item",
    avatar: "/images/content/avatar-4.jpg",
    image: "/images/content/selection-pic-2.jpg",
    image2x: "/images/content/selection-pic-2@2x.jpg",
  },
  {
    title: "Future coming soon",
    content: "1 of 3",
    price: "0.27 ETH",
    url: "/item",
    avatar: "/images/content/avatar-3.jpg",
    image: "/images/content/selection-pic-1.jpg",
    image2x: "/images/content/selection-pic-1@2x.jpg",
  },
  {
    title: "Elon Musk silver coin 3d print",
    content: "1 of 4",
    price: "0.27 ETH",
    url: "/item",
    avatar: "/images/content/avatar-4.jpg",
    image: "/images/content/selection-pic-3.jpg",
    image2x: "/images/content/selection-pic-3@2x.jpg",
  },
];

const users = [
  {
    name: "Payton Harris",
    price: "<span>2.456</span> ETH",
    counter: "6",
    avatar: "/images/content/avatar-1.jpg",
  },
  {
    name: "Anita Bins",
    price: "<span>2.456</span> ETH",
    counter: "2",
    avatar: "/images/content/avatar-2.jpg",
  },
  {
    name: "Joana Wuckert",
    price: "<span>2.456</span> ETH",
    counter: "3",
    avatar: "/images/content/avatar-3.jpg",
  },
  {
    name: "Lorena Ledner",
    price: "<span>2.456</span> ETH",
    counter: "4",
    avatar: "/images/content/avatar-4.jpg",
  },
];

const Selection = () => {
  return (
    <div className={cn("section-pb", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col}>
            {items.map(
              (x, index) =>
                index === 0 && (
                  <Link className={styles.card} to={x.url} key={index}>
                    <div className={styles.preview}>
                      <img
                        srcSet={`${x.image2x} 2x`}
                        src={x.image}
                        alt="Selection"
                      />
                    </div>
                    <div className={styles.head}>
                      <div className={styles.line}>
                        <div className={styles.avatar}>
                          <img src={x.avatar} alt="Avatar" />
                        </div>
                        <div className={styles.description}>
                          <div className={styles.title}>{x.title}</div>
                          <div className={styles.counter}>{x.counter}</div>
                        </div>
                      </div>
                      <div className={styles.box}>
                        <div className={styles.content}>{x.content}</div>
                        <div className={styles.price}>{x.price}</div>
                      </div>
                    </div>
                  </Link>
                )
            )}
          </div>
          <div className={styles.col}>
            {items.map(
              (x, index) =>
                index > 0 && (
                  <Link className={styles.item} to={x.url} key={index}>
                    <div className={styles.preview}>
                      <img
                        srcSet={`${x.image2x} 2x`}
                        src={x.image}
                        alt="Selection"
                      />
                    </div>
                    <div className={styles.description}>
                      <div className={styles.title}>{x.title}</div>
                      <div className={styles.line}>
                        <div className={styles.avatar}>
                          <img src={x.avatar} alt="Avatar" />
                        </div>
                        <div className={styles.price}>{x.price}</div>
                        <div className={styles.content}>{x.content}</div>
                      </div>
                      <button
                        className={cn(
                          "button-stroke button-small",
                          styles.button
                        )}
                      >
                        Place a bid
                      </button>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.info}>
            Latest upload from creators{" "}
            <span className={styles.smile} role="img" aria-label="fire">
              🔥
            </span>
          </div>
          <div className={styles.list}>
            {users.map((x, index) => (
              <div className={styles.user} key={index}>
                <div className={styles.avatar}>
                  <img src={x.avatar} alt="Avatar" />
                  <div className={styles.number}>{x.counter}</div>
                </div>
                <div className={styles.description}>
                  <div className={styles.name}>{x.name}</div>
                  <div
                    className={styles.money}
                    dangerouslySetInnerHTML={{ __html: x.price }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Link
            className={cn("button-stroke button-small", styles.button)}
            to="/search01"
          >
            <span>Discover more</span>
            <Icon name="arrow-next" size="10" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Selection;
