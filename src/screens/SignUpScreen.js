import React, { useEffect} from 'react';
import { View, Text } from 'react-native';
import {signIn} from '../redux/actions/dataAction'

function SignUpScreen () {

    useEffect(() => {
            signIn()
      }, []);
  
    return (
      <View>
        <Text> SignUpScreen </Text>
      </View>
    );
  
}

export default SignUpScreen;
