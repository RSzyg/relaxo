import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, Animated} from 'react-native';

const Grid = ({changed, value}) => {
  const width = useRef(new Animated.Value(0)).current;

  const scaleIn = () => {
    Animated.timing(width, {
      toValue: 28,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    scaleIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (changed) {
      width.setValue(0);
      scaleIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed]);

  return (
    <Animated.View
      style={[
        styles.container,
        value > 0 && styles.textGrid,
        {width, height: width},
      ]}>
      {value > 1 && <Text style={styles.text}>{value - 1}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textGrid: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Grid;
