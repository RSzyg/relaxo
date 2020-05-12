export const getRandomInt = (max, step = 1) => {
  return Math.floor(Math.random() * Math.floor(max / step)) * step;
};
