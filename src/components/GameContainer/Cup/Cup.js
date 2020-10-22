import React, { forwardRef } from "react";
import styles from "./Cup.module.css";
import { gsap } from "gsap";

const Cup = forwardRef(({ hasBall, children }, ref) => {
  const handleClick = (e) => {
    gsap.timeline().to(e.target, { top: 0 });
  };
  return (
    <div
      ref={ref}
      className={styles.cup}
      hasball={hasBall.toString()}
      onClick={handleClick}>
      {children}
    </div>
  );
});

Cup.displayName = "Cup";

export default Cup;
