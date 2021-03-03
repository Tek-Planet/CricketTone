import React from 'react';
import { View, Text , StyleSheet, FlatList} from 'react-native';

function SeriesTable (table) {

  const tbl = [{name:'ManCity', played:20,won:20,tied:0,lost:0,points:100,net_run_rate:9000}]
  
  const tableListItem = (item) => {
    return (
     <View style={{flexDirection:'row', marginBottom:5 }}>
        <View style={{width:'30%'}}>
        <Text style={styles.subTeamName}> {item.name} </Text>

        </View>
       <View style={{flexDirection:'row', justifyContent:'space-evenly', width:'50%'}}> 
       <Text style={styles.subTeamName}> {item.played} </Text>
      <Text style={styles.subTeamName}> {item.won} </Text>
      <Text style={styles.subTeamName}> {item.tied} </Text>
      <Text style={styles.subTeamName}> {item.lost} </Text>
      <Text style={styles.subTeamName}> {item.points} </Text></View>

      <View style={{width:'20%'}}>
      <Text style={styles.subTeamName}> {item.net_run_rate} </Text>

        </View>
   </View>
    )

  }
    return (
      <View>
        <View style={{flexDirection:'row', marginBottom:5}}>

        <View style={{width:'30%'}}>
           <Text style={styles.teamName}> Team </Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-evenly', width:'50%'}}> 
           <Text style={styles.teamName}> P </Text>
           <Text style={styles.teamName}> W </Text>
           <Text style={styles.teamName}> D </Text>
           <Text style={styles.teamName}> L </Text>
           <Text style={styles.teamName}> PT </Text>
        </View>
        <View style={{width:'20%'}}>
           <Text style={styles.teamName}> NRR </Text>
        </View>

        </View>

        {/* <Text>{JSON.stringify(table.teams[0].rounds)}</Text> */}

  {    table.teams[0].rounds.length > 0 ?
          ( 
          <FlatList     
            data = {table.teams[0].rounds[0].groups[0].teams}
            renderItem = {({item}) =>{   
            return (tableListItem(item))
            }}
            keyExtractor={(item) => item.name}
           
            />
            // <Text style={{fontSize:30}}>{table.teams[0].rounds.length} </Text>
            ):(   <Text style={{fontSize:20, textAlign:'center'}}>No Data Found</Text>)
       
}
      </View>
    );
  }


export default SeriesTable;


const styles = StyleSheet.create({
  headingBox: {padding:10, backgroundColor:'#23395d', margin:5, borderRadius:10},
  
  scoreBox: {padding:10, margin:5, borderRadius:10, flexDirection:'row', justifyContent:"space-between", backgroundColor:'#fff',
  elevation: 5,},

  teamName: {color: '#000', fontSize:20, fontWeight:'bold', textAlign:'center'},

  subTeamName: {color:  '#000', fontSize:16,  textAlign:'center' },

  team: {flexDirection:"column", alignItems:'center'},

  score:{color:'#000', fontSize:16, marginTop:10},

  seperator:{color:'#000', fontSize:18, fontWeight:'bold'},

  loadingText:{
    fontSize:20,
    marginTop:200
  }, 
})
