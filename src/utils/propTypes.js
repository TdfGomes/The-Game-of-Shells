import PropTypes from "prop-types";
import { GAME_STATUS } from "./constants";

const props = {
  gameStatus: PropTypes.oneOf(Object.values(GAME_STATUS)).isRequired,
};

export default props;
