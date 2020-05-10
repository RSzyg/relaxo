import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, PanResponder} from 'react-native';

import Board from '../component/Board';
import {LevelList} from '../common/config';

const directionMap = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
};

const Level = ({level = 0}) => {
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
  const [preview, setPreview] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleDirectionChange = dir => {
    let isSuccess = true;
    const needPreview = [];
    const nextBoard = JSON.parse(JSON.stringify(curBoard));
    nextBoard.forEach((row, rIdx) => {
      row.grids.forEach((grid, gIdx) => {
        if (dir && grid.value > 1) {
          let [y, x, val] = [rIdx, gIdx, grid.value - 1];
          while (val > 0) {
            // check border
            if (
              x + directionMap[dir][0] * val < 0 ||
              x + directionMap[dir][0] * val >= width ||
              y + directionMap[dir][1] * val < 0 ||
              y + directionMap[dir][1] * val >= height
            ) {
              isSuccess = false;
              break;
            }

            // check cur grid content
            x += directionMap[dir][0];
            y += directionMap[dir][1];
            if (nextBoard[y].grids[x].value === -1) {
              isSuccess = false;
              break;
            }
            if (nextBoard[y].grids[x].value === 0) {
              val -= 1;
            }
          }

          // add grid index into need preview list
          needPreview.push([rIdx, gIdx]);
        } else {
          grid.status = 'basic';
        }
      });
    });

    // update grid preview
    needPreview.forEach(pair => {
      let [y, x] = pair;
      while (x >= 0 && x < width && y >= 0 && y < height) {
        if (nextBoard[y].grids[x].value === -1) {
          break;
        }
        if (nextBoard[y].grids[x].value === 1) {
          x += directionMap[dir][0];
          y += directionMap[dir][1];
          continue;
        }
        nextBoard[y].grids[x].status = isSuccess ? 'success' : 'fail';
        x += directionMap[dir][0];
        y += directionMap[dir][1];
      }
    });
    setCurBoard(nextBoard);
    setPreview(needPreview);
    setSuccess(isSuccess);
  };

  const handleRelease = () => {
    if (success) {
      const nextBoard = JSON.parse(JSON.stringify(curBoard));
      preview.forEach(pair => {
        let [y, x] = pair;
        let val = nextBoard[y].grids[x].value;
        while (val > 0) {
          if (nextBoard[y].grids[x].value === -1) {
            break;
          }
          if (nextBoard[y].grids[x].value === 1) {
            x += directionMap[direction][0];
            y += directionMap[direction][1];
            continue;
          }
          nextBoard[y].grids[x].value = 1;
          x += directionMap[direction][0];
          y += directionMap[direction][1];
          val -= 1;
        }
      });
      setCurBoard(nextBoard);
    }
    setPreview([]);

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

  useEffect(() => {
    handleDirectionChange(direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

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
