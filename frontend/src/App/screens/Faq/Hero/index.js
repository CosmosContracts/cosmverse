import React, { useState } from "react";
import cn from "classnames";
import styles from "./Hero.module.sass";
import Dropdown from "../../../components/Dropdown";
import Icon from "../../../components/Icon";
import Item from "./Item";

const items = [
  {
    title: "General",
    icon: "home",
    items: [
      "How does it work",
      "How to start with Stacks",
      "Dose it suppport Dark Mode",
      "Does it support Auto-Layout",
      "What is Stacks Design System",
    ],
  },
  {
    title: "Support",
    icon: "circle-and-square",
    items: [
      "How to start with Stacks",
      "Dose it suppport Dark Mode",
      "Does it support Auto-Layout",
      "What is Stacks Design System",
      "How does it work",
      "How to start with Stacks",
    ],
  },
  {
    title: "Hosting",
    icon: "lightning",
    items: [
      "How does it work",
      "How to start with Stacks",
      "Dose it suppport Dark Mode",
      "What is Stacks Design System",
    ],
  },
  {
    title: "Product",
    icon: "pen",
    items: [
      "How does it work",
      "How to start with Stacks",
      "Dose it suppport Dark Mode",
      "Does it support Auto-Layout",
      "What is Stacks Design System",
    ],
  },
];

const Hero = () => {
  const options = [];
  items.map((x) => options.push(x.title));

  const [direction, setDirection] = useState(options[0]);

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.stage}>learn how to get started</div>
          <h1 className={cn("h2", styles.title)}>Frequently asked questions</h1>
          <div className={styles.info}>
            Join Stacks community now to get free updates and also alot of
            freebies are waiting for you or{" "}
            <a href="/#" rel="noopener noreferrer">
              Contact Support
            </a>
          </div>
          <Dropdown
            className={cn("mobile-show", styles.dropdown)}
            value={direction}
            setValue={setDirection}
            options={options}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.nav}>
              {items.map((x, index) => (
                <div
                  className={cn(styles.link, {
                    [styles.active]: x.title === direction,
                  })}
                  onClick={() => setDirection(x.title)}
                  key={index}
                >
                  <Icon name={x.icon} size="16" />
                  <span>{x.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.col}>
            {items
              .find((x) => x.title === direction)
              .items.map((x, index) => (
                <Item className={styles.item} item={x} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
