import React from 'react';
import {View, StyleSheet} from 'react-native';

import Grid from './Grid';

const getOffset = (width, size, idx) => {
  if (size % 2 === 0) {
    return (idx - size / 2 + 0.5) * width;
  } else {
    return (idx - (size - 1) / 2) * width;
  }
};

const Board = ({board = [], resetFlag}) => {
  return (
    <View>
      {board.map((r, rIdx) => {
        const rowProps = {key: r.id, style: [styles.row]};
        if (rIdx !== 0) {
          rowProps.style.push(styles.overlapTop);
        }
        return (
          <View {...rowProps}>
            {r.grids.map((g, gIdx) => {
              return (
                <Grid
                  key={g.id}
                  offset={getOffset(1, r.grids.length, gIdx)}
                  value={g.value}
                  changed={g.changed}
                  resetFlag={resetFlag}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  overlapTop: {
    marginTop: -1,
  },
});

export default Board;
