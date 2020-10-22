import React from "react";
import PropTypes from "prop-types";
import styles from "./GameActions.module.css";

function GameActions({ onStart }) {
  return (
    <div className={styles.game_actions}>
      <button onClick={onStart}>Start</button>
    </div>
  );
}

GameActions.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default GameActions;
