import React from 'react';
import {View, StyleSheet} from 'react-native';

import Board from '../component/Board';
import {level} from '../common/config';

const Level = () => {
  return (
    <View style={styles.container}>
      <Board board={level[0]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Level;
