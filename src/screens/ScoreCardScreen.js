import React  from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScoreCardScreen ({match}) {
  

 
    return (
      
       <View>
          <View style={styles.headingBox}>
          <Text style={styles.headingText}>Scores</Text>  
          </View>     
          <View style={styles.row}> 
            <Text style={styles.teamName}>  {match.teams.a.short_name}  </Text>
            <Text style={styles.seperator}>-</Text> 
            <Text style={styles.score}>120-3</Text>
            <Text style={styles.score}>(14.4)</Text>       
          </View>   

           <View style={styles.row}> 
            <Text style={styles.teamName}>  {match.teams.b.short_name}  </Text>
            <Text style={styles.seperator}>-</Text> 
            <Text style={styles.score}>120-3</Text>
            <Text style={styles.score}>(14.4)</Text>       
          </View>  

           <View style={styles.row}> 
            <Text style={styles.teamName}> Batman  </Text>
            <Text style={styles.score}>R</Text>
            <Text style={styles.score}>B</Text>   
            <Text style={styles.score}>4</Text>
            <Text style={styles.score}>6</Text> 
            <Text style={styles.score}>SR</Text>      
          </View>  

          <View style={styles.row}> 
            <Text style={styles.teamName}> Batman2  </Text>
            <Text style={styles.score}>R</Text>
            <Text style={styles.score}>B</Text>   
            <Text style={styles.score}>4</Text>
            <Text style={styles.score}>6</Text> 
                
          </View>  

          <View style={styles.row}> 
            <Text style={styles.teamName}> Batman2  </Text>
            <Text style={styles.score}>R</Text>
            <Text style={styles.score}>B</Text>   
            <Text style={styles.score}>4</Text>
            <Text style={styles.score}>6</Text> 
               
          </View>  

          <View style={styles.row}> 
            <Text style={styles.teamName}> Batman3  </Text>
            <Text style={styles.score}>R</Text>
            <Text style={styles.score}>B</Text>   
            <Text style={styles.score}>4</Text>
            <Text style={styles.score}>6</Text> 
               
          </View>  

          <View style={styles.row}> 
            <Text style={styles.teamName}> Bowler </Text>
            <Text style={styles.score}>R</Text>
            <Text style={styles.score}>B</Text>   
            <Text style={styles.score}>4</Text>
            <Text style={styles.score}>6</Text> 
               
          </View>  

          <View style={styles.row}> 
            <Text style={styles.teamName}> Bowler1  </Text>
            <Text style={styles.score}>R</Text>
            <Text style={styles.score}>B</Text>   
            <Text style={styles.score}>4</Text>
            <Text style={styles.score}>6</Text> 
               
          </View>  
      </View>
    );
  
}

const styles = StyleSheet.create({
  headingBox: {padding:5, backgroundColor:'#23395d', margin:5, borderRadius:10},
  
  headingText: {color: '#FFF', fontSize:22, fontWeight:'bold'},

  playerName: {fontSize:18,margin: 5, maxWidth:200, textAlign:'center'},

  teamName: {color: '#000', fontSize:20, fontWeight:'bold', marginLeft:10, },

  score:{color:'#000', fontSize:16, },

  seperator:{color:'#000', fontSize:18, fontWeight:'bold'},

  row:{marginTop:10, flexDirection:'row', justifyContent:'space-evenly'}

})
