import React from "react";
import cn from "classnames";
import styles from "./Report.module.sass";
import TextArea from "../TextArea";

const Report = ({ className }) => {
  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn("h4", styles.title)}>Report</div>
      <div className={styles.text}>
        Describe why you think this item should be removed from marketplace
      </div>
      <TextArea
        className={styles.field}
        label="message"
        name="Message"
        placeholder="Tell us the details"
        required="required"
      />
      <div className={styles.btns}>
        <button className={cn("button", styles.button)}>Send now</button>
        <button className={cn("button-stroke", styles.button)}>Cancel</button>
      </div>
    </div>
  );
};

export default Report;
