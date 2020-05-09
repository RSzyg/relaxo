import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Board = ({board = []}) => {
  return (
    <View>
      {board.map((r, rIdx) => {
        const rowProps = {key: `row-${rIdx}`, style: [styles.row]};
        if (rIdx !== 0) {
          rowProps.style.push(styles.overlapTop);
        }
        return (
          <View {...rowProps}>
            {r.map((g, gIdx) => {
              const gridProps = {
                key: `grid-${gIdx}`,
                style: [],
              };

              if (g < 0) {
                gridProps.style.push(styles.grid);
              } else if (g === 0) {
                gridProps.style.push(styles.grid, styles.fullBorder);
              } else {
                gridProps.style.push(styles.grid, styles.fullBorder);
                gridProps.children = <Text style={styles.text}>{g}</Text>;
              }

              if (gIdx !== 0) {
                gridProps.style.push(styles.overlapLeft);
              }

              return <View {...gridProps} />;
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
  grid: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullBorder: {
    borderWidth: 1,
  },
  overlapLeft: {
    marginLeft: -1,
  },
  overlapTop: {
    marginTop: -1,
  },
  text: {
    fontSize: 18,
  },
});

export default Board;
