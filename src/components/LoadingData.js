import React from 'react';
import { View, Text, ActivityIndicator} from 'react-native';

const loadingData = ()=> {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color: '#000',  fontSize:20,}}>Fetching Data Please Wait</Text>
        <ActivityIndicator size={50} color={'#000'}/>
        </View>
    )
}

export default loadingData