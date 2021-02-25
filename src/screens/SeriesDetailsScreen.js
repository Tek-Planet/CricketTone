import React, {useEffect}from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList,ActivityIndicator,TouchableOpacity } from 'react-native'
import axios from 'axios';


export default function SeriesDetailsScreen({route, navigation}) {

  const [state, setState] = React.useState({
    match : {},
    isLoaded:false,
   
  })
  const {key,name} =route.params;
  const access_token = 's1362178663747031042s1365294091465792064'


  const fetchData = () => {
    axios.get(`https://rest.cricketapi.com/rest/v2/recent_seasons/?access_token=${access_token}`)
    .then(res => {
      console.log(res.data.data)
      setState({
        ...state,
        series:res.data.data,
        isLoaded:true
    });
    
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
        else(console.log("Data is available"))

  }, 5000);
}, []);

const seriesListItem = (item) => {
  return(
  <View style={styles.scoreBox}>
    <TouchableOpacity
      onPress={() => navigation.navigate('SeriesDetails',  {key: item.key})} >
      <Text style={styles.teamName}>{item.name}</Text>   
      </TouchableOpacity>
      <Text style={styles.score}>Venue: {item.venue}</Text>         
      <Text style={styles.score}>Start Date: {item.start_date.str}</Text>          
  </View>
  )}

  return (
    <View>
       <View style={styles.headingBox}>
             <Text style={styles.headingText}>{name}</Text>                  
        </View>
       <Text >{key}</Text>   
     </View>
  );
}

const styles = StyleSheet.create({
  headingBox: {padding:10, backgroundColor:'#23395d', margin:5, borderRadius:10},
  
  headingText: {color: '#FFF', fontSize:22, fontWeight:'bold'},

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