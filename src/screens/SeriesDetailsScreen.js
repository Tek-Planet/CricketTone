import React, {useEffect}from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList,ActivityIndicator,TouchableOpacity } from 'react-native'
import axios from 'axios';
import SeriesTopNav from '../navigation/SeriesTopNav'
import LoadingData from  '../components/LoadingData'



export default function SeriesDetailsScreen({route, navigation}) {

  const [state, setState] = React.useState({
    matches : [],
    table : [],
    isLoaded:false,
   
  })
  const {key,name} =route.params;
  const access_token = '2s1362178663747031042s1365950273549384486'
  const matchesQuerry = axios.get(`https://rest.cricketapi.com/rest/v2/season/${key}/?access_token=${access_token}`)
  const tableQuerry = axios.get(`https://rest.cricketapi.com/rest/v2/season/${key}/points/?access_token=${access_token}`)


  const fetchData = () => {
    Promise.all([matchesQuerry,tableQuerry])
    .then(res => {
      console.log(res[1].data.data.points.rounds[0].groups[0].teams)
      if (condition) {
        
      }
      setState({
        ...state,
        matches:Object.values(res[0].data.data.season.matches),
        table:Object.values(res[1].data.data.points),
        isLoaded:true
    });
    //  table:res[1].data.data.points.rounds[0].groups[0].teams,
    })
      .catch(err => {
        console.log(err)
      })
  }

useEffect(() => {
  setTimeout(() => {
        if(!state.isLoaded){
        fetchData()
        }

  }, 5000);
}, []);


  return (
    <View style={{flex:1, marginBottom:30}}>
        <View style={styles.headingBox}>
             <Text style={styles.headingText}>{key}</Text>                  
        </View>
        {state.isLoaded ? ( 
        <SeriesTopNav matches = {state.matches} navigation = {navigation}  table={state.table.rounds[0].groups[0].teams} />  
        ): (
          <LoadingData />
        )}
     </View>
  );
}

const styles = StyleSheet.create({
  headingBox: {padding:10, backgroundColor:'#23395d', margin:5, borderRadius:10},
  
  headingText: {color: '#FFF', fontSize:20, fontWeight:'bold'},

  scoreBox: {padding:10, margin:5, borderRadius:10, flexDirection:'row', justifyContent:"space-between", backgroundColor:'#fff',
  elevation: 5,},

  teamName: {color: '#000', fontSize:20, fontWeight:'bold', },

  subTeamName: {color:  '#000', fontSize:16,  textAlign:'center' },

  team: {flexDirection:"column", alignItems:'center'},

  score:{color:'#000', fontSize:16, marginTop:10},

  seperator:{color:'#000', fontSize:18, fontWeight:'bold'},

  loadingText:{
    fontSize:20,
    marginTop:200
  }, 
})