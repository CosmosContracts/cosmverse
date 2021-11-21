import React, { useState } from "react";

import { AccountButton } from "./Account-button";
import Icon from "../Icon";
import Image from "../Image";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import User from "./User";
import cn from "classnames";
import  cosmverseLogo  from '../../assets/cosmverse_logo.svg';
import styles from "./Header.module.sass";

const nav = [
  {
    url: "/search01",
    title: "Discover",
  },
  {
    url: "/faq",
    title: "How it work",
  },
  {
    url: "/item",
    title: "Create item",
  },
  {
    url: "/profile",
    title: "Profile",
  },
];

const Headers = () :JSX.Element => {
  const [visibleNav, setVisibleNav] = useState(true);
  const [search, setSearch] = useState("");

  const handleSubmit = (e :Event) => {
    alert();
  };

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src={cosmverseLogo}
            srcDark={cosmverseLogo}
            alt="Cosmverse Logo" />
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>

          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link
                className={styles.link}
                // activeClassName={styles.active}
                to={x.url}
                key={index}
              >
                {x.title}
              </Link>
            ))}
          </nav>

          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="20" />
            </button>
          </form>


          <Link
            className={cn("button-small", styles.button)}
            to="/mint"
          >
            Mint
          </Link>
        </div>
        <Link
          className={cn("button-small", styles.button)}
          to="/mint"
        >
          Mint
        </Link>
          
        <Notification className={styles.notification} />
        <AccountButton />

        <User className={styles.user} />
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

export default Headers;
