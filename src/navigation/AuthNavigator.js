import React from 'react';
import { createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import AuthScreen from '../screens/AuthScreen'

export default createStackNavigator({
  AuthScreen: AuthScreen,
})
