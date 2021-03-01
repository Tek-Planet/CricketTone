import React, {useEffect } from 'react';
import { View, Text, StyleSheet, Image,ScrollView, FlatList,ActivityIndicator, Linking } from 'react-native';
import axios from 'axios';
import NewsListItem from '../components/NewListItem'
import LoadingData  from '../components/LoadingData'

function DetailedScreen ()  {

  const [state, setState] = React.useState({
    news : [],
    isLoaded:false
  })


  const access_token = '2s1362178663747031042s1366722683991114530'

  const fetchData = () => {

    axios.get(`https://rest.cricketapi.com/rest/v2/news_aggregation/?access_token=${access_token}`)
    .then(res => {
   //   console.log(res.data)
      setState({
        ...state,
         news:res.data.data.news,
         isLoaded:true
    });
    
    })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    setTimeout(() => {
      if(!state.isLoaded)
          fetchData()
    }, 5000);
  }, []);

  
    return (
      <View style={{flex:1}}>
      <View style={styles.headingBox}>
          <Text style={styles.headingText}>Latest News</Text>                  
      </View>

      {
       state.isLoaded ? (
         <FlatList    
         data = {state.news}
         renderItem = {({item}) =>{   
          return (NewsListItem(item))
         }}
         keyExtractor={(item) => item.title}
         />

       ):( 
            <LoadingData />
         )      

       }
   </View>         
     
    );
  
}

export default DetailedScreen;

const styles = StyleSheet.create({

  headingBox: {padding:10, backgroundColor:'#23395d', margin:5, borderRadius:10},
  
  headingText: {color: '#FFF', fontSize:22, fontWeight:'bold'},


  scoreBox: { padding:10, margin:5, borderRadius:10, flexDirection:'row',  backgroundColor:'#fff',
  elevation: 5,
},

  imgFlag: { width:80, height:80, borderRadius:10,   },

  teamName: {color: '#000', fontSize:18, fontWeight:'bold', textAlign:'justify'},

  teamA: {flexDirection:"row"},

  teamB: {flexDirection:"row"},

  score:{color:'#000', fontSize:16,textAlign:'justify'},

  seperator:{color:'#000', fontSize:18, fontWeight:'bold'},

  textStyle: {
 
    color: '#E91E63',
    textDecorationLine: 'underline'
 
  }
  
})


