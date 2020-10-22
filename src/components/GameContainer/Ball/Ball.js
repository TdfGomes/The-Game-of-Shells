import React, { forwardRef } from "react";
import styles from "./Ball.module.css";

const Ball = forwardRef((_, ref) => {
  return <div ref={ref} className={styles.ball} aria-label="ball" />;
});

Ball.displayName = "Ball";

export default Ball;
