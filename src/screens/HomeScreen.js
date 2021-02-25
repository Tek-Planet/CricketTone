import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet,Image, ActivityIndicator,FlatList, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';


export default function HomeScreen({navigation}) {
  //  hold all state
  const [state, setState] = React.useState({
    scores : [],
    isLoaded:false
  })

  const access_token = 's1362178663747031042s1365294091465792064'

  useEffect(() => {
    setTimeout(() => {
      axios.get(`https://rest.cricketapi.com/rest/v2/recent_matches/?access_token=${access_token}`)
      .then(res => {
      
        setState({
          ...state,
           scores:res.data.data.cards,
           isLoaded:true
      });
      
      })
        .catch(err => {
          console.log(err)
        })
    }, 5000);
  }, []);

  const scoreListItem = (item) => {
    return(
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('MatchDetails',  {key: item.key})} >
                    <View style={styles.scoreBox}>
                      <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>                 
                             <Text style={styles.teamName}>{item.teams.a.name}</Text>
                            <View style={{alignItems:'center'}}><Text style={styles.score}>120/3</Text>
                              <Text style={styles.score}>14.4</Text>
                            </View>

                            <Text style={styles.seperator}>-</Text> 

                          <View style={{alignItems:'center'}}>
                              <Text style={styles.score}>120/3</Text>
                              <Text style={styles.score}>14.4</Text>
                          </View>
                          <Text style={styles.teamName}>{item.teams.b.name}</Text>  
                      </View>
                      <Text style={styles.completed}>{item.msgs.completed}</Text>  
                      </View>
                      </TouchableOpacity>   
                </View>

    )}


  return (

       <ScrollView>
         <View style={styles.headingBox}>
             <Text style={styles.headingText}>Live Scores</Text>                  
         </View>

         {
          state.isLoaded ? (
            <FlatList    
            data = {state.scores}
            renderItem = {({item}) =>{   
             return (scoreListItem(item))
            }}
            />

          ):( 
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.loadingText}>Loading Data Please Wait</Text>
              <ActivityIndicator size={50} color={'#000'}/>
          </View>
            )      

          }
      </ScrollView>
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

  loadingText:{
    fontSize:20,
    marginTop:200
  },

  completed:{
    marginTop:10,
    marginStart:10,
    fontSize:15,
    color:'#000'
  }
  
})


