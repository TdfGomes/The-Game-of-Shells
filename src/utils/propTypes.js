import PropTypes from "prop-types";
import { GAME_STATUS } from "./constants";

export default {
  gameStatus: PropTypes.oneOf(Object.values(GAME_STATUS)).isRequired,
};
