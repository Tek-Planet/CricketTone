import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

export default function HomeScreen({navigation}) {
  //  hold all state
  const [state, setState] = useState({
    scores: {},
    isLoaded: false,
    matches: [],
  });

  function validate() {
    let formData = new FormData();
    formData.append('type', 'login');
    formData.append('email', 'techplanet49@gmail.com');
    formData.append('password', 'QuidProQuo@1012');

    return fetch('https://trailerbabu.com/authentication.php', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        console.log(res.data);
      })

      .catch((error) => {
        console.error(error);
      });
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     //   getMessages();
  //   }, 5000);
  // }, []);

  const [images, setImages] = useState([
    {
      title: 'Viajes Deza',
      image: require('../assets/imgs/more/one.jpg'),
      id: 0,
    },
    {
      title: 'Last Minute',
      image: require('../assets/imgs/more/two.jpg'),
      id: 1,
    },
    {title: 'Dream CC', image: require('../assets/imgs/more/three.jpg'), id: 2},
    {
      title: 'Jorge Aristegui',
      image: require('../assets/imgs/more/four.jpg'),
      id: 3,
    },
    {
      title: 'Melissa Zuñiga',
      image: require('../assets/imgs/more/five.jpg'),
      id: 4,
    },
    {title: 'Viajes', image: require('../assets/imgs/more/one.jpg'), id: 5},
  ]);

  const imageListItem = (item) => {
    return (
      <View
        style={{
          width: '50%',
          elevation: 5,
          margin: 3,
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
        }}>
        <ImageBackground
          style={{
            width: 170,
            height: 150,
            margin: 5,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
          }}
          source={item.image}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        numColumns={2}
        data={images}
        renderItem={({item}) => {
          return imageListItem(item);
        }}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headingBox: {
    padding: 10,
    backgroundColor: '#23395d',
    margin: 5,
    borderRadius: 10,
  },

  headingText: {color: '#FFF', fontSize: 22, fontWeight: 'bold'},

  categoryList: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#0037018D',
  },
  categoryListText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
