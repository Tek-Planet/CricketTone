import React from 'react';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import SeriesScreen from '../screens/SeriesScreen';
import MoreScreen from '../screens/MoreScreen';

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabScreen = ({navigation}) => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#23395d',
      inactiveTintColor: '#000000',
    }}
    initialRouteName="Matches"
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color}) => {
        let iconName;
        if (route.name === 'Matches') {
          iconName = focused ? 'tennisball' : 'tennisball-outline';
        } else if (route.name === 'News') {
          iconName = focused ? 'newspaper' : 'newspaper-outline';
        } else if (route.name === 'Series') {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'More') {
          iconName = focused
            ? 'ellipsis-horizontal'
            : 'ellipsis-horizontal-outline';
        }

        // You can return any component that you like here!
        return (
          <Ionicons
            name={iconName}
            size={26}
            color={color}
            style={{paddingTop: 5}}
          />
        );
      },
      tabBarLabel: ({focused, color}) => {
        let labelName;
        if (route.name === 'Matches') {
          labelName = 'Matches';
        } else if (route.name === 'News') {
          labelName = 'News';
        } else if (route.name === 'Series') {
          labelName = 'Series';
        } else if (route.name === 'More') {
          labelName = 'More';
        }

        // You can return any component that you like here!
        return <Text style={{color: color, marginBottom: 5}}>{labelName}</Text>;
      },
    })}>
    <Tab.Screen name="Matches" component={HomeStackScreen} />
    <Tab.Screen name="News" component={NewsStackScreen} />
    <Tab.Screen name="Series" component={SeriesStackScreen} />
    <Tab.Screen name="More" component={MoreStackScreen} />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'CricketTone (Live Scores)',

      headerStyle: {
        backgroundColor: '#23395d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {},
    }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <Ionicons
            name="ios-menu"
            color={'#fff'}
            style={{margin: 10}}
            size={25}
            color={'#FFF'}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const NewsStackScreen = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'CricketTone (Latest News)',

      headerStyle: {
        backgroundColor: '#23395d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {},
    }}>
    <Stack.Screen
      name="News"
      component={NewsScreen}
      options={{
        headerLeft: () => (
          <Ionicons
            name="ios-menu"
            color={'#fff'}
            style={{margin: 10}}
            size={25}
            color={'#FFF'}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const SeriesStackScreen = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'CricketTone (Series)',

      headerStyle: {
        backgroundColor: '#23395d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }}>
    <Stack.Screen
      name="Series"
      component={SeriesScreen}
      options={{
        headerLeft: () => (
          <Ionicons
            name="ios-menu"
            color={'#fff'}
            style={{margin: 10}}
            size={25}
            color={'#FFF'}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const MoreStackScreen = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'CricketTone (Gallery)',

      headerStyle: {
        backgroundColor: '#23395d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {},
    }}>
    <Stack.Screen
      name="More"
      component={MoreScreen}
      options={{
        headerLeft: () => (
          <Ionicons
            name="ios-menu"
            color={'#fff'}
            style={{margin: 10}}
            size={25}
            color={'#FFF'}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </Stack.Navigator>
);
