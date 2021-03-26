import React from 'react';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import SeriesScreen from '../screens/SeriesScreen';
import MoreScreen from '../screens/MoreScreen';

// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabScreen = ({navigation}) => (
  <Tab.Navigator
    activeColor="#FFFFFF"
    inactiveColor="#A9A9A9"
    initialRouteName="Matches"
    barStyle={{backgroundColor: '#222222', height: 60}}
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
        return <Ionicons name={iconName} size={26} color={color} />;
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
      headerTitle: 'Live Scores',

      headerStyle: {
        backgroundColor: '#23395d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
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
      headerTitle: 'Latest News',

      headerStyle: {
        backgroundColor: '#23395d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
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
      headerTitle: 'Series',

      headerStyle: {
        backgroundColor: '#23395d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
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
      headerTitle: 'Gallery',

      headerStyle: {
        backgroundColor: '#23395d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
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
