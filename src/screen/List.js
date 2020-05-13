import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {backgroundColorLight, tintColor} from '../common/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {LevelList} from '../common/config';

const List = ({navigation}) => {
  const gotoLevel = level => () => {
    navigation.replace('Level', {initLevel: level});
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {LevelList.map((_, level) => (
          <View key={`level-${level}`} style={styles.btnContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={gotoLevel(level)}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>{level + 1}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColorLight[10],
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  btnContainer: {
    padding: 8,
  },
  btn: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: tintColor[10],
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    color: tintColor[10],
  },
});

export default List;
