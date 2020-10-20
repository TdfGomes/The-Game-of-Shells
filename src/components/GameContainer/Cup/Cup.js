import React from "react";
import Ball from "../Ball";

import styles from "./Cup.module.css";

function Cup({ hasBall }) {
  return !hasBall ? (
    <div className={styles.cup} />
  ) : (
    <>
      <div className={styles.cup_wrapper}>
        <div className={styles.cup} />
        <Ball isHidden />
      </div>
    </>
  );
}

export default Cup;
