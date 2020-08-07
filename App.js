import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import MainScreen from './src/MainScreen';
import MusicListScreen from './src/MusicListScreen';
import getMusicScreen from './src/getMusicScreen';
import MyScreen from './src/MyScreen';
import PerformList from './src/PerformList';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={PerformList} />
      <Stack.Screen name="My" component={getMusicScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="MusicList" component={MusicListScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}