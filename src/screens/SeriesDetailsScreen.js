import React, {useEffect}from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import axios from 'axios';
import SeriesTopNav from '../navigation/SeriesTopNav'
import LoadingData from  '../components/LoadingData'



export default function SeriesDetailsScreen({route, navigation}) {

  const [state, setState] = React.useState({
    matches : [],
    table : [],
    isLoaded:false,
    error:false,
    errorType:'',
    tbl:[],
    
   
  })                          

  const {key,name} =route.params;

  const access_token = '2s1362178663747031042s1366722683991114530'
  // 2s1362178663747031042s1366722683991114530
  const matchesQuerry = axios.get(`https://rest.cricketapi.com/rest/v2/season/${key}/?access_token=${access_token}`)
  const tableQuerry = axios.get(`https://rest.cricketapi.com/rest/v2/season/${key}/points/?access_token=${access_token}`)


  const fetchData = () => {
    Promise.all([matchesQuerry,tableQuerry])
    .then(res => {
     if (res[0].data.status_code === 200){
      setState({
        ...state,
        matches:Object.values(res[0].data.data.season.matches),
        // table:Object.values(res[1].data.data.points.rounds[0].groups[0].teams),
        tbl:Object.values(res[1].data.data),
        isLoaded:true,
       
    })
     }

     else{
      setState({
        ...state,
        error:true,
        errorType:'bad response'
    })
     }
    
    })
      .catch(err => {
        if(err.message === "Network Error")
        { console.log('Internet Problem')
        setState({
         ...state,
          error:true,
          errorType:'network'
     });
       }
         else  console.log(err.message)
      })
  }

useEffect(() => {
  setTimeout(() => {
        if(!state.isLoaded){
        fetchData()
        }

  }, 500);
}, []);

const errorPage = () => {
  return (
           
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Image 
            style={{width:200, height:200, borderRadius:100, marginBottom:20}}
             source={require('../assets/imgs/err.jpg')}
         />
   <Text style={{color:'#000', fontSize:18, marginBottom:10}}>Hmm. We’re having trouble fetching data</Text>
  
   <Text style={{color:'#000', fontSize:18, marginBottom:20}}>Check your network connection.</Text>
  
     <TouchableOpacity
               onPress={()=> [fetchData(),   setState({  
                 ...state,
                 error: false,
                 })]}
  
               style={[styles.categoryList]}>
             <Text style={styles.categoryListText}> Try Again</Text>
     </TouchableOpacity>
  </View>
  )
  }

const badResponsePage = () => {
    return (
             
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image 
              style={{width:200, height:200, borderRadius:100, marginBottom:20}}
               source={require('../assets/imgs/forbidden.png')}
           />
    
     {/* <Text style={{color:'#000', fontSize:18, marginBottom:20}}>Bad Response</Text> */}
    
       <TouchableOpacity onPress={()=> navigation.goBack()}  style={[styles.categoryList]}>
               <Text style={styles.categoryListText}>Go Back</Text>
       </TouchableOpacity>
    </View>
    )
    }
    
  return (
    <View style={{flex:1, marginBottom:30}}>
        <View style={styles.headingBox}>
             <Text style={styles.headingText}>{key}</Text>                  
        </View>

        {state.isLoaded ? ( 
        <SeriesTopNav matches = {state.matches} navigation = {navigation}  table={state.tbl} />  
        ): (
          !state.error   ?  ( <LoadingData />):( 
            state.errorType === 'network' ? errorPage() : (badResponsePage())            
            )

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
  categoryList: {
    padding:14,
    borderRadius:10,
    backgroundColor: '#23395d'
  },
  categoryListText:{
    color:'#ffffff',
    fontSize:16
  },
  
})