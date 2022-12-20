/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * @author Vadim Savin
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import Purchases from 'react-native-purchases';
import { API_KEY } from './constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PaywallScreen from './screens/PaywallScreen';
import UserScreen from './screens/UserScreen';
import WeatherScreen from './screens/WeatherScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const WeatherRouter = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Weather"
      component={WeatherScreen}
      options={{
        title: '✨ Magic Weather',
      }}
    />
  </Stack.Navigator>
);

const UserRouter = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="User"
      component={UserScreen}
      options={{
        title: 'User',
      }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Weather"
        component={WeatherRouter}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'sunny' : 'sunny-outline'} color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="User"
        component={UserRouter}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'ios-person-circle' : 'ios-person-circle-outline'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Paywall"
          component={PaywallScreen}
          options={{
            title: '✨ Magic Weather Premium',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  useEffect(() => {
    
    Purchases.setDebugLogsEnabled(true);

    Purchases.configure({ apiKey: API_KEY, appUserID: null, observerMode: false, useAmazon: false });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Router />
    </>
  );
};

export default App;
