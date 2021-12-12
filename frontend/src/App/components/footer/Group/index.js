import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Group.module.sass";
import Icon from "../../Icon";

const Group = ({ className, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(className, styles.group, { [styles.active]: visible })}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        {item.title}
        <Icon name="arrow-bottom" size="10" />
      </div>
      <div className={styles.menu}>
        {item.menu.map((x, index) =>
          x.url.startsWith("http") ? (
            <a
              className={styles.link}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              {x.title}
            </a>
          ) : (
            <Link className={styles.link} to={x.url} key={index}>
              {x.title}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Group;
