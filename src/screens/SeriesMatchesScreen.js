import React, { Component } from 'react';
import { View, Text,FlatList } from 'react-native';
import MatchListItem from '../components/MatchListItem'



function SeriesMatchesScreen ({matches}) {


    return (
            <View>
                            <Text>hey:</Text>
            <FlatList    
            data = {matches}
            renderItem = {({item}) =>{   
             return (MatchListItem(item))
            }}
            />
            </View>
    );
  
}

export default SeriesMatchesScreen;
