import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

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
              const gridProps = {
                key: g.id,
                style: [styles.gridContainer],
              };

              if (g.value === 0) {
                gridProps.style.push(styles.basicGrid);
                if (g.status === 'success') {
                  gridProps.style.push(styles.basicSuccess);
                } else if (g.status === 'fail') {
                  gridProps.style.push(styles.basicFail);
                }
              } else if (g.value > 0) {
                gridProps.style.push(styles.textGrid);
                if (g.status === 'success') {
                  gridProps.style.push(styles.textSuccess);
                } else if (g.status === 'fail') {
                  gridProps.style.push(styles.textFail);
                }
                gridProps.children = <Text style={styles.text}>{g.value}</Text>;
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
  gridContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  basicGrid: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  textGrid: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  basicSuccess: {
    borderColor: '#00E676',
    backgroundColor: 'rgba(27, 94, 32, 0.4)',
    zIndex: 100,
  },
  textSuccess: {
    borderColor: '#00E676',
    backgroundColor: 'rgba(102, 187, 106, 0.5)',
    zIndex: 100,
  },
  basicFail: {
    borderColor: '#FF1744',
    backgroundColor: 'rgba(183, 28, 28, 0.4)',
    zIndex: 100,
  },
  textFail: {
    borderColor: '#FF1744',
    backgroundColor: 'rgba(239, 83, 80, 0.5)',
    zIndex: 100,
  },
  overlapLeft: {
    marginLeft: -1,
  },
  overlapTop: {
    marginTop: -1,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Board;
