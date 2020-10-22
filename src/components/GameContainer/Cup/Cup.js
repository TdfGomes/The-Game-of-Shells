import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { props } from "../../../utils";
import styles from "./Cup.module.css";
import { gsap } from "gsap";

const Cup = forwardRef(({ hasBall, children, onClick, gameStatus }, ref) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (gameStatus !== "started") {
      return;
    }

    const upTween = gsap.to(e.target, {
      top: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });

    if (!hasBall) {
      onClick("gameOver");
      return upTween.yoyo(true).repeat(1);
    }

    onClick("win");
    return upTween.play();
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

Cup.propTypes = {
  hasBall: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.array,
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  gameStatus: props.gameStatus,
};

Cup.displayName = "Cup";

export default Cup;
