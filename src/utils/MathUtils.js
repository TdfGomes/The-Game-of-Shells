const addOffset = (offSet) => (elementWidth) => {
  return Math.ceil(offSet - 200 + Math.ceil(elementWidth / 4));
};

const minusOffset = (offSet) => (elementWidth) => {
  return Math.ceil(offSet - 200 + Math.ceil(elementWidth / 4));
};

export default { addOffset, minusOffset };
