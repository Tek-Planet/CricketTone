import React, {useEffect, useContext} from 'react';
import {Text, View} from 'react-native';
import {useStateValue} from '../data/StateProvider';
import {setToken} from '../redux/actions/dataAction';

export function MoreScreen() {
  const [{token}, dispatch] = useStateValue();
  const key = 'getting close';
  useEffect(() => {
    setTimeout(() => {
      setToken(key, dispatch);
    }, 1500);
  }, []);

  return (
    <View>
      <Text> textInComponent {token} </Text>
    </View>
  );
}

export default MoreScreen;
