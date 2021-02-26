import React, { useEffect,useState } from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList,ActivityIndicator,TouchableOpacity } from 'react-native'
import axios from 'axios';

export function SeriesScreen ({navigation})  {

  const [state, setState] = useState({
    series : [],
    isLoaded:false
  })
        
  const access_token = '2s1362178663747031042s1365667590042688960'

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
                onPress={() => navigation.navigate('SeriesDetails',  {key: item.key,name: item.name})} >
                <Text style={styles.teamName}>{item.name}</Text>   
                </TouchableOpacity>
                <Text style={styles.score}>Venue: {item.venue}</Text>         
                <Text style={styles.score}>Start Date: {item.start_date.str}</Text>          
            </View>
            )}

            return (
              <ScrollView>
              <View style={styles.headingBox}>
                  <Text style={styles.headingText}>Series</Text>                  
              </View>

              {
       state.isLoaded ? (
         <FlatList    
         data = {state.series}
         renderItem = {({item}) =>{   
          return (seriesListItem(item))
         }}
         />

       ):( 
       <View style={{ alignItems:'center',}} >
           <Text style={styles.loadingText}>Fetching Series</Text>
           <ActivityIndicator size={50} color={'#000'}/>
       </View>
         )      

       }

      </ScrollView>
    )
  
}

export default SeriesScreen

const styles = StyleSheet.create({

  headingBox: {padding:10, backgroundColor:'#23395d', margin:5, borderRadius:10},
  
  headingText: {color: '#FFF', fontSize:22, fontWeight:'bold'},


  scoreBox: { padding:10, margin:5, borderRadius:10,   backgroundColor:'#fff',
  elevation: 5,
},

  

  teamName: {color: '#000', fontSize:18, fontWeight:'bold', textAlign:'justify'},

  score:{color:'#000', fontSize:16,textAlign:'justify'},

  seperator:{color:'#000', fontSize:18, fontWeight:'bold'},

  textStyle: {
 
    color: '#E91E63',
    textDecorationLine: 'underline'
 
  }
  
})




