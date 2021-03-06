import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { props } from "../../../utils";
import styles from "./Cup.module.css";
import { gsap } from "gsap";
import { constants } from "../../../utils";

const { GAME_STATUS } = constants;

export const anime = (selector) =>
  gsap.to(selector, {
    top: 0,
    duration: 0.8,
    ease: "power2.inOut",
  });

const Cup = forwardRef(({ hasBall, children, onClick, gameStatus }, ref) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (gameStatus !== GAME_STATUS.started) {
      return;
    }

    const upTween = anime(e.target);

    if (!hasBall) {
      onClick(GAME_STATUS.gameOver);
      return upTween.yoyo(true).repeat(1);
    }

    onClick(GAME_STATUS.win);
    return upTween.play();
  };
  return (
    <div
      ref={ref}
      className={styles.cup}
      hasball={hasBall.toString()}
      onClick={handleClick}
      aria-label="cup">
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
