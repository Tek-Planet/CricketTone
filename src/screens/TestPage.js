import React, {useState} from 'react';
import {Text, View} from 'react-native';
import ImageView from 'react-native-image-viewing';

export function MoreScreen() {
  const images = [
    {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/uberclone-8449d.appspot.com/o/one.jpg?alt=media&token=6f192742-30ea-440e-8cae-084a16596bf4',
    },
    {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/uberclone-8449d.appspot.com/o/two.jpg?alt=media&token=922102dd-2153-449d-81b0-0f23370074ef',
    },
    {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/uberclone-8449d.appspot.com/o/three.jpg?alt=media&token=c60d0bf7-8818-4b58-9074-8073db30bd96',
    },
    {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/uberclone-8449d.appspot.com/o/four.jpg?alt=media&token=403ef0a8-4e84-4a60-beda-195a3565a204',
    },
    {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/uberclone-8449d.appspot.com/o/four.jpg?alt=media&token=403ef0a8-4e84-4a60-beda-195a3565a204',
    },
  ];
  const [visible, setIsVisible] = useState(true);

  return (
    <View>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <Text>not showing</Text>
    </View>
  );
}

export default MoreScreen;
