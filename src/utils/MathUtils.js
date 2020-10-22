/**
 * This functions aims to center the ball with the cup.
 * Note: We are using the 200 from the horizontal container padding
 *
 * @param {integer} offSetX
 * @param {integer} elementWidth
 */

const addOffset = (offSetX, elementWidth) => {
  return Math.ceil(offSetX + 200 - Math.ceil(elementWidth * 4));
};

const minusOffset = (offSetX, elementWidth) => {
  return Math.ceil(offSetX - 200 + Math.ceil(elementWidth / 4));
};

export default { addOffset, minusOffset };
