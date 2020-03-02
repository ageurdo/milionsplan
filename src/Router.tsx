import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from './screens/splash/splash'
import Home from './screens/home/Home'

const noHeaderNavigationOptions = {
    headerShown: false,
}

const noNavegableHeaderNavigationOptions = {
    gestureEnable: false,
    ...noHeaderNavigationOptions
};

const AppNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: noNavegableHeaderNavigationOptions
    },
    Home: {
        screen: Home,
        navigationOptions: noNavegableHeaderNavigationOptions
    },
},
    {
        initialRouteName: 'Splash',
    });

export default createAppContainer(AppNavigator);