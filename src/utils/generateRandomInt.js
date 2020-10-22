/**
 * Randomize a set of numbers bettween 0 and max (exclusive)
 *
 * @param {integer} max
 */
export default function getRandomInt(max = 3) {
  return Math.floor(Math.random() * max);
}
