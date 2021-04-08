import React, {createContext, useState} from 'react';
import axios from 'axios';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prepares the dataLayer
export const AuthContext = createContext();

// Wrap our app and provide the Data layer
export const AuthProvider = ({children}) => {
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [scores, setScores] = useState(null);
  const [news, setNews] = useState(null);
  const [series, setSeries] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = (token) => {
    const matchQuery = axios.get(
      `https://rest.cricketapi.com/rest/v2/recent_matches/?access_token=${token}&card_type=summary_card`,
    );
    const newsQuery = axios.get(
      `https://rest.cricketapi.com/rest/v2/news_aggregation/?access_token=${token}`,
    );
    const seriesQuery = axios.get(
      `https://rest.cricketapi.com/rest/v2/recent_seasons/?access_token=${token}`,
    );
    Promise.all([matchQuery, newsQuery, seriesQuery])
      .then((res) => {
        setScores(res[0].data.data.cards);
        setNews(res[1].data.data.news);
        setSeries(res[2].data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        //  console.log(err.type)
        if (err.message === 'Network Error') {
          console.log('Internet Problem');
        } else console.log(err.message);
      });
  };

  const storeUserProfile = async (userDetails) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(userDetails));
      console.log('Profile stored');
      setUserProfile(userDetails);
      //  navigation.navigate('Home');
    } catch {
      setError('Error storing data on device');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userProfile,
        setUserProfile,
        token,
        setToken,
        scores,
        setScores,
        news,
        setNews,
        series,
        setSeries,
        error,
        setError,
        fetchData: (token) => {
          fetchData(token);
        },
        isLoading,
        setIsLoading,

        googleLogin: async () => {
          try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(
              idToken,
            );

            // console.log('credentials', googleCredential);

            // Sign-in the user with the credential
            // return auth().signInWithCredential(googleCredential);

            auth()
              .signInWithCredential(googleCredential)
              .then((res) => {
                console.log('signed in successful!');
                storeUserProfile(res.user);
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (error) {
            console.log(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
