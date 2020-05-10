import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Transition = ({level, route, navigation}) => {
  if (route.params) {
    level = route.params.level;
  }

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Level', {level});
    }, 500);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{level + 1}</Text>
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
  text: {
    color: '#fff',
    fontSize: 72,
  },
});

export default Transition;
