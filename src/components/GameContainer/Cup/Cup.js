import React, { forwardRef } from "react";
import styles from "./Cup.module.css";

const Cup = forwardRef(({ hasBall, children }, ref) => {
  return (
    <div ref={ref} className={styles.cup} hasball={hasBall.toString()}>
      {children}
    </div>
  );
});

Cup.displayName = "Cup";

export default Cup;
