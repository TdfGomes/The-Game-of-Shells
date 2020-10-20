import React, { forwardRef } from "react";
import cx from "classnames";
import styles from "./Ball.module.css";

const Ball = forwardRef(({ isHidden }, ref) => {
  const css = !isHidden ? styles.ball : cx(styles.ball, styles.hidden);
  return <div ref={ref} className={css} />;
});

export default Ball;
