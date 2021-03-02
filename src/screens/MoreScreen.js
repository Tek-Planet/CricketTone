import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet,Image, ActivityIndicator,FlatList, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';


export default function HomeScreen({navigation}) {
  //  hold all state
  const [state, setState] = React.useState({
    scores : {},
    isLoaded:false,
    matches:[]
  })


 function validate() {
	
		let formData = new FormData();
		formData.append('type', 'login');
		formData.append('email', 'techplanet49@gmail.com');
		formData.append('password', '123');

		return fetch('https://trailerbabu.com/authentication.php', {
			method: 'POST',
			body: formData
		})
			.then((res) =>  {

        console.log(res) })
		
			.catch((error) => {
				console.error(error);
			});
  }
  

  useEffect(() => {
    setTimeout(() => {
          if(!state.isLoaded){
          validate()
          }
  
    }, 5000);
  }, []);



 
  return ( 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Image 
                 style={{width:150, height:150, borderRadius:100, marginBottom:20}}
                  source={require('../assets/imgs/error.png')}
              />
        <Text style={{color:'#fff', fontSize:18, marginBottom:10}}>Hmm. We’re having trouble fetching data</Text>

        <Text style={{color:'#fff', fontSize:18, marginBottom:20}}>Check your network connection.</Text>

          <TouchableOpacity
                    style={[styles.categoryList,{backgroundColor: '#bd10e0'}]}>
                  <Text style={styles.categoryListText}> Try Again</Text>
          </TouchableOpacity>
      </View>) 

    
}

const styles = StyleSheet.create({

  headingBox: {padding:10, backgroundColor:'#23395d', margin:5, borderRadius:10},
  
  headingText: {color: '#FFF', fontSize:22, fontWeight:'bold'},

  categoryList: {
    padding:14,
    borderRadius:10,
    backgroundColor: '#0037018D'
  },
  categoryListText:{
    color:'#ffffff',
    fontSize:14
  },
  
})