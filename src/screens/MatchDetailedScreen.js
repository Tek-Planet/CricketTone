import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,ScrollView} from 'react-native';
import CustomNavigation from '../navigation/CustomBottomNav'
import axios from 'axios';


function NewsScreen ({route, navigation}) {
 
  const [state, setState] = React.useState({
    match : {},
    isLoaded:false
  })

  const {key} = route.params;

  const access_token = 's1362178663747031042s1365294091465792064'

  
  useEffect(() => {
    setTimeout(() => {
      axios.get(`https://rest.cricketapi.com/rest/v2/match/${key}/?access_token=${access_token}`)
      .then(res => {
        console.log(res.data)
        setState({
          ...state,
           match:res.data.data.card,
          isLoaded:true
      });
      
      })
        .catch(err => {
          console.log(err)
        })
    }, 5000);
  }, []);

    return (
      <View style={{marginBottom:60}}>
         <View style={styles.headingBox}>
             <Text style={styles.headingText}>Match Details</Text>                  
         </View>
        {
            state.isLoaded ? (
            <ScrollView>
              <View style={styles.scoreBox}>
                    <View style={styles.team}> 
              <Text style={styles.teamName}>{state.match.teams.a.name}</Text>
                      <View style={{alignItems:'center'}}><Text style={styles.score}>120/3</Text>
                         <Text style={styles.score}>14.4</Text>
                         <Text style={styles.subTeamName}>Batman 1 - 40*</Text>
                         <Text style={styles.subTeamName}>Batman 2 - 30*</Text>
                      </View>
                    </View>
                    <Text style={styles.seperator}>-</Text> 
                    <View style={styles.team}>
                    
                      <Text style={styles.teamName}>{state.match.teams.b.name}</Text>
                     
                      <View style={{alignItems:'center'}}><Text style={styles.score}>120/3</Text>
                         <Text style={styles.score}>14.4</Text>
                         <Text style={styles.subTeamName}>Batman 1 - 40*</Text>
                         <Text style={styles.subTeamName}>Batman 2 - 30*</Text>
                      </View>
                    </View>      
          
                  </View>
      
                  <CustomNavigation match = {state.match} />     
      
             </ScrollView>):(
              <View style={{  alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.loadingText}>Loading Data Please Wait</Text>
                  <ActivityIndicator size={50} color={'#000'}/>
              </View>
            )
        }
      </View>
      
    );
  }


export default NewsScreen;


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




// https://www.freepik.com/free-vector/webinar-flyer-template-set_11754457.htm#page=1&query=flyer%20template&position=26