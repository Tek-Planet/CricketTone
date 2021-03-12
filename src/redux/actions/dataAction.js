import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = () => {
  try {
    return 'pretty tired';
  } catch (e) {
    console.log(err.message);
  }
};

export const getToken = () => {
  var msgs = 'tired';
  AsyncStorage.getItem('accessCodes')
    .then((accessCodes) => {
      return msgs;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export function setToken(key, dispatch) {
  dispatch({
    type: 'SET_TOKEN',
    token: key,
  });
}
