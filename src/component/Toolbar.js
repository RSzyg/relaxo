import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Toolbar = ({visible, setVisible, onReset}) => {
  const toggleOpacity = useRef(new Animated.Value(1)).current;
  const toolbarHeight = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    Animated.timing(toggleOpacity, {
      toValue: visible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(toolbarHeight, {
      toValue: visible ? 100 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <>
      <Animated.View style={[styles.toggle, {opacity: toggleOpacity}]}>
        <Icon
          name="ios-arrow-up"
          color="#fff"
          size={36}
          onPress={handleToggle}
        />
      </Animated.View>
      <Animated.View style={[styles.toolbar, {height: toolbarHeight}]}>
        <Icon name="ios-refresh" color="#fff" size={36} onPress={onReset} />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  toggle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(33, 33, 33, 0.6)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default Toolbar;
