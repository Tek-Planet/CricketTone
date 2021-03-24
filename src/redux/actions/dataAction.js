import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import  {AuthContext} from  '../../context/AuthProvider'



export function signUp (){
  const { setError } = useContext(AuthContext);

  auth()
      .createUserWithEmailAndPassword('cricket@gmail.com', '123456')
      .then(() => {
        console.log('User account created & signed in!');
        setError('User account created & signed in!')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!')
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setError('That email address is invalid!')
        }

        console.error(error);
      });
}

export function signIn (){
  auth()
  .signInWithEmailAndPassword('cricket@gmail.com', '123456')
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
}


export function setUser(user, dispatch) {
  console.log('set user')
  dispatch({
    type: 'SET_USER',
    token: user,
  });
}

export function setToken(key, dispatch) {
  dispatch({
    type: 'SET_TOKEN',
    token: key,
  });
}


