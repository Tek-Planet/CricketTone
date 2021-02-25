import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default function Splash () {
  const image =  require('../assets/flag.png')
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{width:100, height:100, borderRadius:100, margin:10}}   source={require('../assets/imgs/cricket.png')}/>
          <Text style={{fontSize:22, fontWeight:'bold', color:'#23395d'}}>CricketTone</Text>
      </View>
    );
  
}
