import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Board from '../component/Board';
import {LevelList} from '../common/config';

const Level = ({level = 0}) => {
  const [curBoard] = useState(
    LevelList[level].map((row, rIdx) => ({
      id: `${level}-row-${rIdx}`,
      grids: row.map((grid, gIdx) => ({
        id: `${level}-grid-${gIdx}`,
        status: 'basic',
        value: grid,
      })),
    })),
  );

  return (
    <View style={styles.container}>
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
