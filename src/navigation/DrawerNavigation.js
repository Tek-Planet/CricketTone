import 'react-native-gesture-handler';
import * as React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// screens
import {DrawerContent} from '../navigation/DrawerContent';
import BottomNav from '../navigation/BottomTabScreen';

//init stack
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerScreen = ({navigation}) => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="Tab" component={BottomNav} />
  </Drawer.Navigator>
);

export default DrawerScreen;
