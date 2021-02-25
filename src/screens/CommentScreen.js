import React, {useState } from 'react';
import { View, Text,TextInput, StyleSheet, TouchableOpacity,FlatList, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CommentScreen ({match}){

  const [message, setMessage] = useState ([
    { title: 'Viajes Deza',  type: 'Agencia', status:'unread', time:'1hr', image: require('../assets/flag.png'), 
    body:'omo ma lo send e ooo. I need an augmented reality application. I use cad model and view in camera and the app will match it with real physical objects and I would like to see the', id: 0, },
    { title: 'Last Minute',  type: 'Agencia', status:'unread', time:'1hr', image: require('../assets/flag.png'), 
    body:'Hola qué tal como podria...', id: 1, },
    { title: 'Dream CC', type: 'Agencia',status:'unread',time:'1hr', image: require('../assets/flag.png'), 
    body:'Hola qué tal como podria...', id: 2, },
    { title: 'Jorge Aristegui',type:'Particular', status:'read',time:'4d', image: require('../assets/flag.png'), 
    body:'Hola qué tal como podria...', id: 3,  },
    { title: 'Melissa Zuñiga',type:'Particular', status:'read',time:'5d', image: require('../assets/flag.png'), 
    body:'Hola qué tal como podria...', id: 4,  },

    ]) 

  const messageListItem = (item) => {
    return(
      <View style={{ flexDirection:'row',  margin:5 ,elevation: 5, borderRadius:10}}>
       
         <Image style={{width:50, height:50, borderRadius:100, margin:10}}  source={item.image} />
      
        <View style={{width:"75%" }}>         
            <Text style={{ fontSize:18, fontWeight:'bold', color:'#000',marginTop:10, }}>{item.title} </Text> 
            <Text style={{ fontSize:16, fontWeight:'bold', color:'#000',marginTop:5, }}> {item.time}</Text>
            <Text style={[{paddingBottom:10, marginTop:5, fontSize:16, textAlign:'justify', color:'#000', lineHeight:20}
          ]}>{item.body } </Text> 
        </View>
        
      </View>

    )
  }    

    return (
      <View style={{flex:1}}>
          <View style={{flex:0.7}}>
          <View style={styles.headingBox}>
           <Text style={styles.headingText}>Recent Comments</Text>  
          </View>  
          <FlatList 
                data = {message}
                renderItem = {({item}) =>{
                  return (messageListItem(item))
                }}
                />
          </View>

          <View style={{flex:0.3, marginBottom:20}}>
          <View style={styles.inputContainer}>
            <TextInput 
                      multiline = {true}
                      numberOfLines = {5}
                      placeholder="Description"
                      placeholderTextColor="#666666" 
                      autoCapitalize="none"
                      onChangeText={(val) => textInputChange(val)}
                      style={styles.input}       
                  /> 
          </View>

          <TouchableOpacity
              onPress={() => {}}
              style={[styles.signIn, {
                  borderColor: '#23395d',
                  borderWidth: 1,
                  marginTop: 15
              }]}
          >
              <Text style={[styles.textSign, {
                  color: '#23395d'
              }]}>Submit</Text>
          </TouchableOpacity>
          </View>
        
      </View>
    );
  
}

export default CommentScreen;


const styles = StyleSheet.create({
  headingBox: {padding:10, backgroundColor:'#23395d', margin:5, borderRadius:10},
  
  headingText: {color: '#FFF', fontSize:22, fontWeight:'bold'},

  scoreBox: {padding:10, margin:5, borderRadius:10, flexDirection:'row', justifyContent:"space-between", backgroundColor:'#fff',
  elevation: 5,},

  imgFlag: {width:30, height:30, borderRadius:100,},

  teamName: {color: '#000', fontSize:20, fontWeight:'bold', },

  subTeamName: {color:  '#000', fontSize:16,  textAlign:'center' },

  team: {flexDirection:"column", alignItems:'center'},

  row: {flexDirection:"row"},

  score:{color:'#000', fontSize:16, marginTop:10},

  seperator:{color:'#000', fontSize:18, fontWeight:'bold'},

  inputContainer: {
    margin: 5,
    borderRadius:5,
    borderLeftWidth: 4,
    borderRightWidth: 4,
  
  },
  input: {
    textAlignVertical: 'top',
    backgroundColor: '#ccc',
    paddingLeft: 15,
    paddingRight: 15
  },

  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
}
  
  
})


