import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';

import {getRandomInt} from '../common/utils';
import {tintColor} from '../common/theme';

const Grid = ({offset, value, changed, resetFlag, winned, maxLength}) => {
  const containerWidth = useRef(new Animated.Value(0)).current;
  const internalWidth = useRef(new Animated.Value(0)).current;

  const scaleAnim = (animValue, toValue, delay = 0, duration = 240) =>
    Animated.timing(animValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    });

  useEffect(() => {
    const delay = getRandomInt(300, 10);
    if (value >= 0) {
      const anim = [scaleAnim(containerWidth, 1, delay)];
      containerWidth.setValue(0);
      if (value > 0) {
        anim.push(scaleAnim(internalWidth, 1, delay));
        internalWidth.setValue(0);
      }
      Animated.parallel(anim).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFlag]);

  useEffect(() => {
    if (changed) {
      internalWidth.setValue(0);
      scaleAnim(internalWidth, 1, (changed - 1) * 60).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed]);

  useEffect(() => {
    if (winned) {
      const timer = setTimeout(() => {
        const delay = getRandomInt(300, 10);
        if (value >= 0) {
          const anim = [scaleAnim(containerWidth, 0, delay)];
          if (value > 0) {
            anim.push(scaleAnim(internalWidth, 0, delay));
          }
          Animated.parallel(anim).start();
        }
      }, maxLength * 60 + 720);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winned]);

  return (
    <View style={[styles.container, {left: offset * -1}]}>
      {value >= 0 && (
        <Animated.View
          style={[
            styles.borderContainer,
            styles.border,
            {transform: [{scale: containerWidth}]},
          ]}
        />
      )}
      {value > 0 && (
        <View style={styles.internal}>
          <Animated.View
            style={[styles.withValue, {transform: [{scale: internalWidth}]}]}>
            {value > 1 && <Text style={styles.text}>{value - 1}</Text>}
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    overflow: 'hidden',
  },
  borderContainer: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: tintColor[10],
    backgroundColor: tintColor[2],
  },
  internal: {
    position: 'absolute',
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  withValue: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tintColor[3],
    overflow: 'hidden',
  },
  text: {
    fontSize: 18,
    color: tintColor[10],
  },
});

export default Grid;
