import React, {useEffect, useContext} from 'react';
import {Text, View} from 'react-native';
import {useStateValue} from '../data/StateProvider';

export function MoreScreen() {
  const token = useContext(useStateValue);
  useEffect(() => {
    setTimeout(() => {}, 1500);
  }, []);

  return (
    <View>
      <Text> textInComponent {token} </Text>
    </View>
  );
}

export default MoreScreen;
