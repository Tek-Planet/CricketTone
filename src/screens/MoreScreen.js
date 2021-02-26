import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet,Image, ActivityIndicator,FlatList, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';


export default function HomeScreen({navigation}) {
  //  hold all state
  const [state, setState] = React.useState({
    scores : {},
    isLoaded:false,
    matches:[{'key':'nzaus_2021_t20_05'},
    {'key':'nzaus_2021_t20_04'},
    {'key':'nzaus_2021_t20_03'}]
  })

  const access_token = '2s1362178663747031042s1365667590042688960'

  useEffect(() => {
    setTimeout(() => {
      axios.get(`https://rest.cricketapi.com/rest/v2/season/nzaus_2021/?access_token=${access_token}`)
      .then(res => {
        console.log(res.data.data.season.matches)
        setState({
          ...state,
           scores:res.data.data.season.matches,
           matches:state.scores,
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
                             <Text style={styles.teamName}>{item.key}</Text>                                               
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
        //  scoreListItem(state.scores)
        }

         {
          state.isLoaded ? (
            // <FlatList    
            // data = {state.matches}
            // renderItem = {({item}) =>{   
            //  return (scoreListItem(item))
            // }}
            // />
            state.matches.map((step)=> <Text style={styles.teamName}>{JSON.stringify(step)}</Text>)


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