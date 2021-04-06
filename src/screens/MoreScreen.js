import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import ImageView from 'react-native-image-viewing';
import GestureRecognizer from 'react-native-swipe-gestures';

export default function MoreScreen({navigation}) {
  const images = [
    {
      id: 0,
      title: 'Ball',
      uri:
        'https://firebasestorage.googleapis.com/v0/b/uberclone-8449d.appspot.com/o/one.jpg?alt=media&token=6f192742-30ea-440e-8cae-084a16596bf4',
    },
    {
      id: 1,
      title: 'Receiver',
      uri:
        'https://firebasestorage.googleapis.com/v0/b/uberclone-8449d.appspot.com/o/two.jpg?alt=media&token=922102dd-2153-449d-81b0-0f23370074ef',
    },
    {
      id: 2,
      title: 'Score',
      uri:
        'https://firebasestorage.googleapis.com/v0/b/uberclone-8449d.appspot.com/o/three.jpg?alt=media&token=c60d0bf7-8818-4b58-9074-8073db30bd96',
    },
    {
      id: 3,
      title: 'Indian National Team',
      uri:
        'https://firebasestorage.googleapis.com/v0/b/uberclone-8449d.appspot.com/o/four.jpg?alt=media&token=403ef0a8-4e84-4a60-beda-195a3565a204',
    },
    {
      id: 4,
      title: 'Celebration',
      uri:
        'https://firebasestorage.googleapis.com/v0/b/uberclone-8449d.appspot.com/o/five.jpg?alt=media&token=403ef0a8-4e84-4a60-beda-195a3565a204',
    },
  ];

  const [visible, setIsVisible] = useState(false);
  const [pos, setPos] = useState(0);
  const onSwipeRight = () => {
    navigation.navigate('Matches');
  };

  const onSwipeLeft = () => {
    navigation.goBack();
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const footer = (item) => (
    <View style={{marginTop: -130, alignItems: 'center'}}>
      <Text style={{fontSize: 20, textAlign: 'center', color: '#fff'}}>
        {item.title}
      </Text>
    </View>
  );

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
        <TouchableOpacity
          onPress={() => [setIsVisible(true), setPos(images.indexOf(item))]}>
          <ImageBackground
            style={{
              width: 170,
              height: 150,
              margin: 5,
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
            }}
            source={{uri: item.uri}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (visible) {
    return (
      <ImageView
        images={images}
        imageIndex={pos}
        onImageIndexChange={(pos) => setPos(pos)}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        FooterComponent={() => footer(images[pos])}
      />
    );
  } else {
    return (
      <GestureRecognizer
        onSwipeRight={() => onSwipeRight()}
        onSwipeLeft={() => onSwipeLeft()}
        config={config}
        style={{
          flex: 1,
        }}>
        <FlatList
          numColumns={2}
          data={images}
          renderItem={({item}) => {
            return imageListItem(item);
          }}
          keyExtractor={(item) => item.id}
        />
      </GestureRecognizer>
    );
  }
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
