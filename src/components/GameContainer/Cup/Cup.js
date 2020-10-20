import React, { forwardRef } from "react";
import cx from "classnames";
import Ball from "../Ball";

import styles from "./Cup.module.css";

const Cup = forwardRef(({ hasBall }, ref) => {
  return !hasBall ? (
    <div ref={ref} className={cx(styles.cup, "cup")} />
  ) : (
    <>
      <div className={styles.cup_wrapper}>
        <div ref={ref} className={styles.cup} />
        <Ball isHidden />
      </div>
    </>
  );
});

export default Cup;
