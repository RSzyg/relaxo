export const LevelList = [
  {
    level: 0,
    board: [[2, 0]],
    tips: {
      showPointer: true,
      text: 'swipe right',
    },
  },
  {
    level: 1,
    board: [[0, -1, 0, -1, 0], [0, -1, 0, -1, 0], [3, -1, 3, -1, 3]],
    tips: {
      text: 'swipe up, move together',
    },
  },
  {
    level: 2,
    board: [[-1, -1, 0, -1], [3, 0, 0, 0], [-1, -1, 3, -1]],
    tips: {
      text: 'note the order',
    },
  },
  {
    level: 3,
    board: [
      [-1, -1, -1, -1, 3, -1, -1, -1],
      [-1, -1, -1, -1, 0, -1, -1, -1],
      [5, 0, 0, 0, 0, 0, 0, 0],
      [-1, -1, 0, -1, -1, -1, 0, -1],
      [-1, -1, 3, -1, -1, -1, 3, -1],
    ],
  },
  {
    level: 4,
    board: [[-1, -1, 0], [-1, -1, 0], [2, 3, 0]],
    tips: {
      text: 'numbers will be superimposed',
    },
  },
  {
    level: 5,
    board: [[0, -1, -1], [3, 0, 0], [2, -1, -1]],
  },
  {
    level: 6,
    board: [[-1, 2, 2, -1], [-1, 0, 0, 2], [2, 0, 0, -1]],
  },
];
