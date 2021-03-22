import React, { Component, useContext } from 'react';
import { View, Text } from 'react-native';
import {mainContext} from '../data/StateProvider';


const Entry = () => {
  const { dispatch } = useContext(mainContext);

    return (
      <View>
        <Text> Say something</Text>
      </View>
    );
}


export default Entry;
