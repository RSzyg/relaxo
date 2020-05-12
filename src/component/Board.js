import React from 'react';
import {View, StyleSheet} from 'react-native';
import Grid from './Grid';

const Board = ({board = []}) => {
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
                  overlap={gIdx}
                  value={g.value}
                  changed={g.changed}
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
