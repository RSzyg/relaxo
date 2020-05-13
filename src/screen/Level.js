import React, {useState, useMemo, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Board from '../component/Board';
import {LevelList} from '../common/config';
import Toolbar from '../component/Toolbar';
import {backgroundColorLight, tintColor} from '../common/theme';

const decodeBoard = (board, level) => {
  return board.map((row, rIdx) => ({
    id: `${level}-row-${rIdx}`,
    grids: row.map((grid, gIdx) => ({
      id: `${level}-grid-${gIdx}`,
      status: 'basic',
      value: grid,
      changed: 0,
    })),
  }));
};

const clearStatus = board => {
  board.forEach(row => {
    row.grids.forEach(grid => {
      grid.changed = 0;
    });
  });
  return board;
};

const directionMap = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
};

const Level = ({route, navigation}) => {
  const [level, setLevel] = useState(route?.params?.initLevel || 0);
  const [winned, setWinned] = useState(false);
  const [curBoard, setCurBoard] = useState(
    decodeBoard(LevelList[level], level),
  );
  const [direction, setDirection] = useState(undefined);
  const [showToolbar, setShowToolbar] = useState(false);

  const [resetFlag, setResetFlag] = useState(0);

  const width = useMemo(() => LevelList[level][0].length, [level]);
  const height = useMemo(() => LevelList[level].length, [level]);

  const pointerPos = useRef(new Animated.ValueXY({x: -30, y: 0})).current;
  const pointerOpacity = useRef(new Animated.Value(0)).current;
  const pointerFadeIn = useRef(
    Animated.timing(pointerOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }),
  ).current;
  const pointerFadeOut = useRef(
    Animated.timing(pointerOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
  ).current;

  const pointerLoopAnim = useRef(
    Animated.loop(
      Animated.sequence([
        Animated.delay(300),
        pointerFadeIn,
        Animated.timing(pointerPos, {
          toValue: {x: 30, y: 0},
          duration: 1000,
          useNativeDriver: true,
        }),
        pointerFadeOut,
        Animated.timing(pointerPos, {
          toValue: {x: -30, y: 0},
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.delay(900),
      ]),
    ),
  ).current;

  const gotoLevelList = () => {
    navigation.replace('List');
  };

  const handleReset = () => {
    const nextBoard = decodeBoard(LevelList[level], level);
    setCurBoard(nextBoard);
    setResetFlag(flag => (flag + 1) % 2);
    setShowToolbar(false);
  };

  const checkIfWin = nextBoard => {
    for (let i = 0; i < nextBoard.length; i++) {
      const row = nextBoard[i];
      for (let j = 0; j < row.grids.length; j++) {
        const grid = row.grids[j];
        if (grid.value === 0) {
          setWinned(false);
          return false;
        }
      }
    }
    setWinned(true);
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
      const nextBoard = clearStatus(JSON.parse(JSON.stringify(curBoard)));
      let changed = new Array(
        dir === 'up' || dir === 'down' ? width : height,
      ).fill(1);
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
                const idx = dir === 'up' || dir === 'down' ? x : y;
                nextBoard[y].grids[x].changed = changed[idx];
                changed[idx] += 1;
              } else if (nextBoard[y].grids[x].value > 1) {
                nextBoard[y].grids[x].value += val;
                val = 0;
                const idx = dir === 'up' || dir === 'down' ? x : y;
                nextBoard[y].grids[x].changed = changed[idx];
                changed[idx] += 1;
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
    onPanResponderGrant: () => {
      setShowToolbar(false);
    },
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
    if (winned) {
      if (level === 0) {
        pointerLoopAnim.stop();
        pointerFadeOut.start();
      }
      const timer = setTimeout(() => {
        setLevel((level + 1) % LevelList.length);
        setWinned(false);
      }, Math.max(width - 1, height - 1) * 60 + 1380);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winned]);

  useEffect(() => {
    setCurBoard(decodeBoard(LevelList[level], level));
    if (level === 0) {
      pointerLoopAnim.start();
    }
    return () => {
      pointerLoopAnim.stop();
      pointerFadeOut.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  return (
    <>
      <View style={styles.container} {...panResponder.panHandlers}>
        <View style={styles.levelNumContainer}>
          <Text style={styles.levelNum}>{level + 1}</Text>
        </View>
        <Board board={curBoard} resetFlag={resetFlag} winned={winned} />
        {(level === 0 || level === 1) && (
          <View style={styles.tips}>
            {level === 0 && (
              <Animated.View
                style={{
                  opacity: pointerOpacity,
                  transform: [
                    {translateX: pointerPos.x, translateY: pointerPos.y},
                  ],
                }}>
                <Icon name="hand-pointer-o" size={32} color={tintColor[10]} />
              </Animated.View>
            )}
            {level === 0 && <Text style={styles.tipsText}>swipe to right</Text>}
            {level === 1 && <Text style={styles.tipsText}>swipe to up</Text>}
          </View>
        )}
      </View>
      <Toolbar
        visible={showToolbar}
        setVisible={setShowToolbar}
        onGotoList={gotoLevelList}
        onReset={handleReset}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColorLight[10],
  },
  levelNumContainer: {
    position: 'absolute',
    top: 48,
  },
  levelNum: {
    color: tintColor[10],
    fontSize: 48,
  },
  tips: {
    position: 'absolute',
    bottom: Dimensions.get('window').height / 4,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tipsText: {
    fontSize: 18,
    color: tintColor[10],
  },
});

export default Level;
