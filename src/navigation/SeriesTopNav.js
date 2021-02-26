import React, { useState } from 'react';

import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import SeriesMatchesScreen from '../screens/SeriesMatchesScreen'
import SeriesTableScreen from '../screens/SeriesTableScreen'



function CustomBottomNav ({serie}) {

    const [selector, setSelector] = useState (1)

    const swapScreen = (id) => {
        setSelector(id)
      };
  
   return (
   <View>
            <View style={{ flexDirection:'row',backgroundColor:'#fff',elevation: 5, justifyContent:'space-evenly'}}>
                 
                 <TouchableOpacity style={styles.button} onPress={()=> swapScreen(1) }>
                     <Text style={styles.buttonText}>Matches</Text>
                 </TouchableOpacity> 
         
                 <TouchableOpacity style={styles.button} onPress={()=> swapScreen(2)}>
                     <Text style={styles.buttonText}>Table</Text>
                 </TouchableOpacity> 
                
             </View>
         
            {
                <View>
                    {
                        selector === 1 ? ( <SeriesMatchesScreen matches = {serie.season.matches}/>) : null
                        
                    }

                    {
                        selector === 2 ? (  <SeriesTableScreen />   ) : null
                        
                    }
         
                  
                </View>
            }
   </View>
   )
};

export default CustomBottomNav;


const styles = StyleSheet.create({
  button:  { 
        width:'50%',
        padding:5,
        borderRadius:5,
        borderWidth:1,
        borderColor:  '#000'},
buttonText : {color: '#000', fontSize:20 , textAlign:'center' }
})