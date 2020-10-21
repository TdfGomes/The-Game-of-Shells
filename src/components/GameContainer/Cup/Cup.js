import React, { forwardRef } from "react";
import Ball from "../Ball";

import styles from "./Cup.module.css";

const Cup = forwardRef(({ hasBall, children }, ref) => {
  return !hasBall ? (
    <div ref={ref} className={styles.cup}>
      {children}
    </div>
  ) : (
    <>
      <div className={styles.cup_wrapper}>
        <div ref={ref} className={styles.cup} />
        <Ball isHidden />
      </div>
    </>
  );
});

Cup.displayName = "Cup";

export default Cup;
