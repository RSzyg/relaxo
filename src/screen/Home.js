import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import {backgroundColorLight, tintColor} from '../common/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
  const handleStart = () => {
    navigation.navigate('Level', {initLevel: 0});
  };

  const gotoList = () => {
    navigation.navigate('List');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>RELAXO</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={handleStart}>
          <View style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={gotoList}>
          <Icon name="nav-icon-grid-a" size={32} color={tintColor[10]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColorLight[10],
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    minHeight: 320,
  },
  title: {
    fontSize: 54,
    color: tintColor[10],
  },
  startButton: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    borderWidth: 2,
    borderColor: tintColor[10],
  },
  startButtonText: {
    fontSize: 32,
    color: tintColor[10],
  },
});
export default Home;
