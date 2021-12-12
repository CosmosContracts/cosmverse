import React, { useState } from "react";

import Burn from "../Burn";
import Icon from "../../components copy/Icon";
import Modal from "../../components/Modal";
import OutsideClickHandler from "react-outside-click-handler";
import RemoveSale from "../../components copy/RemoveSale";
import Report from "../../components copy/Report";
import Transfer from "../../components copy/Transfer";
import cn from "classnames";
import styles from "./Actions.module.sass";

const Actions = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const [visibleModalTransfer, setVisibleModalTransfer] = useState(false);
  const [visibleModalRemoveSale, setVisibleModalRemoveSale] = useState(false);
  const [visibleModalBurn, setVisibleModalBurn] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);

  const items = [
    {
      title: "Change price",
      icon: "coin",
      action: () => console.log("coin"),
    },
    {
      title: "Transfer token",
      icon: "arrow-right-square",
      action: () => setVisibleModalTransfer(true),
    },
    {
      title: "Remove from sale",
      icon: "close-circle",
      action: () => setVisibleModalRemoveSale(true),
    },
    {
      title: "Burn token",
      icon: "close-circle",
      action: () => setVisibleModalBurn(true),
    },
    {
      title: "Report",
      icon: "info-circle",
      action: () => setVisibleModalReport(true),
    },
  ];

  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        <div
          className={cn(styles.actions, className, {
            [styles.active]: visible,
          })}
        >
          <button
            className={cn("button-circle-stroke", styles.button)}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="more" size="24" />
          </button>
          <div className={styles.body}>
            {items.map((x, index) => (
              <div className={styles.item} key={index} onClick={x.action}>
                <Icon name={x.icon} size="20" />
                <span>{x.title}</span>
              </div>
            ))}
          </div>
        </div>
      </OutsideClickHandler>
      <Modal
        visible={visibleModalTransfer}
        onClose={() => setVisibleModalTransfer(false)}
      >
        <Transfer />
      </Modal>
      <Modal
        visible={visibleModalRemoveSale}
        onClose={() => setVisibleModalRemoveSale(false)}
      >
        <RemoveSale />
      </Modal>
      <Modal
        visible={visibleModalBurn}
        onClose={() => setVisibleModalBurn(false)}
      >
        <Burn />
      </Modal>
      <Modal
        visible={visibleModalReport}
        onClose={() => setVisibleModalReport(false)}
      >
        <Report />
      </Modal>
    </>
  );
};

export default Actions;
