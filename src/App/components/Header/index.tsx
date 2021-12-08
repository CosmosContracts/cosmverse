import React, { useState } from "react";
import {
  WalletLoader,
  configKeplr,
  loadKeplrWallet,
} from "../../services";

import Icon from "../Icon";
import Image from "../Image";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { Link } from "react-router-dom";
import Notification from "./notification";
import User from "./user";
import cn from "classnames";
import { config } from "../../../config";
import styles from "./Header.module.sass";
import {
   useBoolean,
} from '@chakra-ui/react';
import { useSdk } from "../../services/client/wallet";

const nav = [
  {
    url: "/",
    title: "Explore",
  },
  {
    url: "/dashboard",
    title: "Dashboard",
  },
  {
    url: "/auction",
    title: "Auction",
  },
  {
    url: "/data",
    title: "Data",
  },
];

const Headers = () => {
  const sdk = useSdk();
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useBoolean();



  async function init(loadWallet: WalletLoader) {
    const signer = await loadWallet(config.chainId, config.addressPrefix);
    sdk.init(signer);
  };

  
  async function connectKeplr() {
    setLoading.on();
    const anyWindow = window as KeplrWindow;
    try {
      await anyWindow.keplr?.experimentalSuggestChain(configKeplr(config));
      await anyWindow.keplr?.enable(config.chainId);
      await init(loadKeplrWallet);
    } catch (error) {
      setLoading.off();
      console.error(error);
    }
  }
  const handleSubmit = (e: any) => {
    console.log('searching', e);
  };

  function connectWallet() {
    return (
      <div
      className={cn("button-stroke button-small", styles.button)}
      onClick={connectKeplr}
    >
      Connect Wallet
    </div> 
    )
  }

  function  userConnected() {
    return (
      <>
        <Link
          className={cn("button-small", styles.button)}
          to="/mint"
        >
          Mint
        </Link> 
      <Notification className={styles.notification} />
      <User className={styles.user} sdk={sdk} />
      </>
    )
  }

  function IsUserLogin() {

    return sdk.address ? userConnected() : connectWallet()
  }

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="Cosmverse"
          />
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link
                className={styles.link}
               /* activeClassName={styles.active} */
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
            to="/upload-variants"
          >
            Mint
          </Link>
        </div>
    
       
     
        <IsUserLogin />
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

export default Headers;
