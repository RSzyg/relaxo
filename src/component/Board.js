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
              const gridWrapperProps = {
                key: g.id,
                style: [styles.gridContainer],
              };

              if (g.value >= 0) {
                gridWrapperProps.style.push(styles.basicGridWrapper);
              }

              if (gIdx !== 0) {
                gridWrapperProps.style.push(styles.overlapLeft);
              }

              return (
                <View {...gridWrapperProps}>
                  <Grid changed={g.changed} value={g.value} />
                </View>
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
  gridContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  basicGridWrapper: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  overlapLeft: {
    marginLeft: -1,
  },
  overlapTop: {
    marginTop: -1,
  },
});

export default Board;
