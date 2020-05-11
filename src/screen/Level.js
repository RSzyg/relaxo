import React, {useState, useMemo} from 'react';
import {View, StyleSheet, PanResponder} from 'react-native';

import Board from '../component/Board';
import {LevelList} from '../common/config';

const directionMap = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
};

const Level = ({route, navigation}) => {
  const {level} = route.params;

  const [curBoard, setCurBoard] = useState(
    LevelList[level].map((row, rIdx) => ({
      id: `${level}-row-${rIdx}`,
      grids: row.map((grid, gIdx) => ({
        id: `${level}-grid-${gIdx}`,
        status: 'basic',
        value: grid,
      })),
    })),
  );
  const width = useMemo(() => LevelList[level][0].length, [level]);
  const height = useMemo(() => LevelList[level].length, [level]);
  const [direction, setDirection] = useState(undefined);

  const toNextLevel = () => {
    setTimeout(() => {
      navigation.navigate('Transition', {
        level: (level + 1) % LevelList.length,
      });
    }, 500);
  };

  const checkIfWin = nextBoard => {
    for (let i = 0; i < nextBoard.length; i++) {
      const row = nextBoard[i];
      for (let j = 0; j < row.grids.length; j++) {
        const grid = row.grids[j];
        if (grid.value === 0) {
          return false;
        }
      }
    }
    toNextLevel();
    return true;
  };

  const handleRelease = () => {
    if (direction) {
      const dir = direction;
      let rowStart = 0;
      let rowEnd = height;
      let rowAdd = 1;
      let colStart = 0;
      let colEnd = width;
      let colAdd = 1;
      if (dir === 'left') {
        colStart = width - 1;
        colEnd = -1;
        colAdd = -1;
      } else if (dir === 'up') {
        rowStart = height - 1;
        rowEnd = -1;
        rowAdd = -1;
      }
      const nextBoard = JSON.parse(JSON.stringify(curBoard));
      let [i, j] = [rowStart, colStart];
      while (i !== rowEnd) {
        j = colStart;
        while (j !== colEnd) {
          if (nextBoard[i].grids[j].value > 1) {
            let val = nextBoard[i].grids[j].value - 1;
            let [y, x] = [i, j];
            let [fy, fx] = [i, j];
            nextBoard[i].grids[j].value = 1;
            while (val > 0) {
              const nextX = x + directionMap[dir][0];
              const nextY = y + directionMap[dir][1];
              if (
                nextX < 0 ||
                nextX >= width ||
                nextY < 0 ||
                nextY >= height ||
                nextBoard[nextY].grids[nextX].value === -1
              ) {
                if (nextBoard[y].grids[x].value !== 1) {
                  nextBoard[y].grids[x].value += val;
                } else {
                  nextBoard[fy].grids[fx].value += val;
                }
                break;
              }
              x = nextX;
              y = nextY;
              if (nextBoard[y].grids[x].value === 0) {
                nextBoard[y].grids[x].value++;
                val--;
                fy = y;
                fx = x;
              } else if (nextBoard[y].grids[x].value > 1) {
                nextBoard[y].grids[x].value += val;
                val = 0;
              }
            }
          }
          j += colAdd;
        }
        i += rowAdd;
      }
      setCurBoard(nextBoard);

      checkIfWin(nextBoard);
    }

    setDirection(undefined);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          setDirection('right');
        } else {
          setDirection('left');
        }
      } else if (Math.abs(dy) > 30 && Math.abs(dy) > Math.abs(dx)) {
        if (dy > 0) {
          setDirection('down');
        } else {
          setDirection('up');
        }
      }
    },
    onPanResponderRelease: handleRelease,
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Board board={curBoard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
});

export default Level;
