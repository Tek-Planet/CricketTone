import React, {useState} from 'react';
import {View, Text} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

function SomeComponent({navigation}) {
  const [state, setState] = useState({
    myText: "I'm ready to get swiped!",
    gestureName: 'none',
    backgroundColor: '#fff',
  });

  const onSwipeUp = (gestureState) => {
    setState({
      ...state,
      myText: 'You swiped up!',
    });
  };

  const onSwipeDown = (gestureState) => {
    setState({
      ...state,
      myText: 'You swiped down!',
    });
  };

  const onSwipeLeft = () => {
    navigation.goBack();
  };

  const onSwipeRight = (gestureState) => {
    setState({
      ...state,
      myText: 'You swiped right!',
    });
  };

  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setState({...state, gestureName: gestureName});

    switch (gestureName) {
      case SWIPE_UP:
        setState({
          ...state,
          backgroundColor: 'red',
        });
        break;
      case SWIPE_DOWN:
        setState({
          ...state,
          backgroundColor: 'green',
        });
        break;
      case SWIPE_LEFT:
        setState({
          ...state,
          backgroundColor: 'blue',
        });
        break;
      case SWIPE_RIGHT:
        setState({
          ...state,
          backgroundColor: 'yellow',
        });
        break;
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeLeft={() => onSwipeLeft()}
      onSwipeRight={(state) => onSwipeRight(state)}
      config={config}
      style={{
        flex: 1,
      }}>
      <Text>{state.myText}</Text>
      <Text>onSwipe callback received gesture: {state.gestureName}</Text>
    </GestureRecognizer>
  );
}

export default SomeComponent;
