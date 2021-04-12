import React, {createContext, useState} from 'react';
import axios from 'axios';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

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
  const [likes, setLikes] = useState(true);

  const loginUser = (email, password, navigation) => {
    if (email.length > 0 && password.length > 0) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          setError(null);
          console.log('signed in successful!');
          fetchUserDetails(res.user.uid, navigation);
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            console.log('here is no user record corresponding to this mail!');
            setError('There is no user record corresponding to this mail!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            setError('That email address is invalid!');
          }

          if (error.code === 'auth/wrong-password') {
            console.log('That email address is invalid!');
            setError(
              'The password is invalid or the user does not have a password',
            );
          }
          // setError(error);
          console.error(error);
        });
    } else {
      setError('email and password cannot be empty');
    }
  };

  const fetchUserDetails = (userId, navigation) => {
    firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          storeUserProfile(navigation, documentSnapshot.data());
          // fetchLikes(userId);
        }
      });
  };

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

  const storeUserProfile = async (navigation, userDetails) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(userDetails));
      console.log('Profile stored');
      setUserProfile(userDetails);
      fetchLikes(userId);
      navigation.navigate('Home');
    } catch {
      setError('Error storing data on device');
    }
  };

  const fetchLikes = (userId) => {
    firestore()
      .collection('likes')
      .where('userId', '==', userId)
      .get()
      .then((data) => {
        let likes = [];
        data.forEach((doc) => {
          likes.push({
            likeId: doc.id,
            userId: doc.data().userId,
            imageId: doc.data().imageId,
          });
        });
        setLikes(likes);
        console.log(likes);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
        likes,
        setLikes,
        setError,
        loginUser: (email, password) => {
          loginUser(email, password);
        },
        fetchData: (token) => {
          fetchData(token);
        },
        fetchLikes: (token) => {
          fetchLikes(token);
        },
        isLoading,
        setIsLoading,

        fbLogin: async (navigation) => {
          try {
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            // Sign-in the user with the credential
            const res = await auth().signInWithCredential(facebookCredential);
            storeUserProfile(navigation, res.user);
          } catch (error) {
            console.log(error);
          }
        },

        googleLogin: async (navigation) => {
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
                storeUserProfile(navigation, res.user);
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
