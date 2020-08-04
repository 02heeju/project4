import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import MainScreen from './src/MainScreen';

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: LoginScreen,
//     navigationOptions: {
//       header: null
//     },
//   },
//   SignUp: {
//     screen: SignupScreen,
//     navigationOptions: {
//       header: null
//     },
//   },
//   Main: {
//     screen: MainScreen,
//     navigationOptions: {
//       header: null
//     },
//   },
// });
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
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