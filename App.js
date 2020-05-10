import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Level from './src/screen/Level';
import Transition from './src/screen/Transition';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Transition" options={{headerShown: false}}>
          {props => <Transition {...props} level={0} />}
        </Stack.Screen>
        <Stack.Screen
          name="Level"
          component={Level}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
