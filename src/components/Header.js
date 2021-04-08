import React from 'react';
import {View, Text} from 'react-native';

export default function Header({header}) {
  return (
    <View
      style={{
        padding: 5,
        backgroundColor: '#23395d',
        marginTop: 3,
      }}>
      <Text
        style={{
          marginStart: 10,
          color: '#FFF',
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {header}
      </Text>
    </View>
  );
}
