import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './AuthLoading'

import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'

export default createSwitchNavigator(
  {
    Main: MainNavigator,
    AuthLoading: AuthLoadingScreen,
    Auth: AuthNavigator,
  },{
    initialRouteName: 'AuthLoading'
  }
)
