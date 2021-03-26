import React, {useState} from 'react';

import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import InfoScreen from '../screens/InfoScreen';
import ScoreCardScreen from '../screens/ScoreCardScreen';
import CommentScreen from '../screens/CommentScreen';

function CustomBottomNav({match}) {
  const [selector, setSelector] = useState(1);

  const swapScreen = (id) => {
    setSelector(id);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          elevation: 5,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity style={styles.button} onPress={() => swapScreen(1)}>
          <Text style={styles.buttonText}>Info</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => swapScreen(2)}>
          <Text style={styles.buttonText}>Live Chat</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button} onPress={() => swapScreen(3)}>
          <Text style={styles.buttonText}>Score Card</Text>
        </TouchableOpacity> */}
      </View>

      {
        <View>
          {selector === 1 ? <InfoScreen match={match} /> : null}

          {selector === 2 ? <CommentScreen match={match} /> : null}

          {selector === 3 ? <ScoreCardScreen match={match} /> : null}
        </View>
      }
    </View>
  );
}

export default CustomBottomNav;

const styles = StyleSheet.create({
  button: {
    width: '50%',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {color: '#000', fontSize: 20, textAlign: 'center'},
});
