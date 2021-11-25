import React from "react";
import cn from "classnames";
import styles from "./Cards.module.sass";
import Icon from "../../../components/Icon";

const Cards = ({ className, items }) => {
  return (
    <div className={(className, styles.cards)}>
      {items.map((x, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.plus} style={{ backgroundColor: x.color }}>
            <Icon name="plus" size="24" />
          </div>
          <div className={styles.subtitle}>{x.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
