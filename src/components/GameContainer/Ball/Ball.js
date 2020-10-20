import React from "react";
import cx from "classnames";
import styles from "./Ball.module.css";

function Ball({ isHidden }) {
  const css = !isHidden ? styles.ball : cx(styles.ball, styles.hidden);
  return <div className={css} />;
}

export default Ball;
