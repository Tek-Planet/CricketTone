import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet,Image, ActivityIndicator,FlatList, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';
import MatchListItem from '../components/MatchListItem'
import LoadingData from '../components/LoadingData'


export default function HomeScreen({navigation}) {
  //  hold all state
  const [state, setState] = React.useState({
    scores : [],
    isLoaded:false,
    error:false
  })

  const access_token = '2s1362178663747031042s1366722683991114530'

  const fetchData = () =>{
    axios.get(`https://rest.cricketapi.com/rest/v2/recent_matches/?access_token=${access_token}`)
    .then(res => {

      setState({
        ...state,
         scores:res.data.data.cards,
         isLoaded:true
    });
    
    })
      .catch(err => {
      //  console.log(err.type)
        if(err.message === "Network Error")
       { console.log('Internet Problem')
       setState({
        ...state,
         error:true
    });
      }
        else  console.log('non Internet Problem')
        
      })
  }

  useEffect(() => {
    setTimeout(() => {
        fetchData()
    }, 5000);
  }, []);

  
  return (

       <View style={{flex:1}}>
         <View style={styles.headingBox}>
             <Text style={styles.headingText}>Live Scores</Text>                  
         </View>

         {
          state.isLoaded ? (
            <FlatList    
            data = {state.scores}
            renderItem = {({item}) =>{   
             return (MatchListItem(item, navigation))
            }}
            keyExtractor={(item) => item.key}
            />

          ):( 
             !state.error ? ( <LoadingData />):(
               <Text>Aswear Error Dey</Text>
             )
            )      

          }
      </View>
  );
}

const styles = StyleSheet.create({

  headingBox: {padding:10, backgroundColor:'#23395d', margin:5, borderRadius:10},
  
  headingText: {color: '#FFF', fontSize:22, fontWeight:'bold'},

  scoreBox: {padding:10, margin:5, borderRadius:10,  backgroundColor:'#fff',elevation: 5, borderWidth:1, borderColor:'#23395d'},

  imgFlag: {width:30, height:30, borderRadius:100, marginBottom:20},

  teamName: {color: '#000', fontWeight:'bold', fontSize:18, marginLeft:10, marginRight:10, width:100, textAlign:'center'},

  teamA: {flexDirection:"row"},

  teamB: {flexDirection:"row"},

  score:{color:'#000', fontSize:16},

  seperator:{color:'#000', fontSize:18, fontWeight:'bold'},

  completed:{
    marginTop:10,
    marginStart:10,
    fontSize:15,
    color:'#000'
  }
  
})