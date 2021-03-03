import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {getData} from '../redux/actions/dataAction';

export function MoreScreen() {
  // const msg = getData();

  useEffect(() => {
    setTimeout(() => {
      console.log(getData());
    }, 1500);
  }, []);

  return (
    <View>
      <Text> textInComponent </Text>
    </View>
  );
}

export default MoreScreen;
