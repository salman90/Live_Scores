import React from 'react';

import { createStackNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';

export default createStackNavigator({
  AuthLoading: AuthLoadingScreen,
  
})
