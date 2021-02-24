import React, {useEffect } from 'react';
import { View, Text, StyleSheet, Image,ScrollView, FlatList,ActivityIndicator, Linking } from 'react-native';
import axios from 'axios';



function DetailedScreen ()  {

  const [state, setState] = React.useState({
    news : [],
    isLoaded:false
  })

  const newsListItem = (item) => {
    return(
    <View style={styles.scoreBox}>
      <View style={styles.teamB}>
      <View style={{width:'70%'}}>
        <Text style={styles.teamName}>{item.title}</Text>
        <Text style={styles.score}>{item.description_text}</Text>
        

        <Text style={styles.textStyle} onPress={ ()=> Linking.openURL(`${item.provider.url}`) } >Click Here To Visit source.</Text>

      </View>
      <View style={{margin: 10, width:'30%', justifyContent:'center'}}>
         <Image 
          style={styles.imgFlag}
          source={require('../assets/flag.png')}
        /> 
         </View>
      </View>               
    </View>
    )}

  useEffect(() => {
    setTimeout(() => {
      axios.get('https://rest.cricketapi.com/rest/v2/news_aggregation/?access_token=2s1362178663747031042s1364907355665475353')
      .then(res => {
        console.log(res.data)
        setState({
          ...state,
           news:res.data.data.news,
           isLoaded:true
      });
      
      })
        .catch(err => {
          console.log(err)
        })
    }, 5000);
  }, []);

  
    return (
      <ScrollView>
      <View style={styles.headingBox}>
          <Text style={styles.headingText}>Latest News</Text>                  
      </View>

      {
       state.isLoaded ? (
         <FlatList    
         data = {state.news}
         renderItem = {({item}) =>{   
          return (newsListItem(item))
         }}
         />

       ):( 
       <View style={{ alignItems:'center',}} >
           <Text style={styles.loadingText}>Fetching News</Text>
           <ActivityIndicator size={50} color={'#000'}/>
       </View>
         )      

       }
   </ScrollView>         
     
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


