import React from 'react';
import { View, Text, StyleSheet,Image} from 'react-native';



 const newsListItem = (item) => {
    return(
    <View style={styles.scoreBox}>

        <Text style={styles.teamName}>{item.title}</Text>
        <Text style={styles.score}>{item.description_text}</Text>        
        <Text style={styles.textStyle} onPress={ ()=> Linking.openURL(`${item.provider.url}`) } >Click Here To Visit source.</Text>
                
    </View>
    )}

    export default newsListItem


    const styles = StyleSheet.create({

scoreBox: { padding:10, margin:5, borderRadius:10,  backgroundColor:'#fff',
        elevation: 5,
      },
      
        imgFlag: { width:80, height:80, borderRadius:10,   },
      
        teamName: {color: '#000', fontSize:18, fontWeight:'bold', textAlign:'justify'},
      
        teamA: {flexDirection:"row"},
      
        teamB: {flexDirection:"row"},
      
        score:{color:'#000', fontSize:16,textAlign:'justify'},
      
        textStyle: {
       
          color: '#E91E63',
          textDecorationLine: 'underline'
       
        }
        
      })
      
      
      