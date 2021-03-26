import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../context/AuthProvider';
import {signUp} from '../redux/actions/dataAction';

const SignInScreen = ({navigation}) => {
  const {error, setError,  setUserProfile} = useContext(AuthContext);
  const [data, setData] = React.useState({
    userName: '',
    password: '',
    email: '',
    check_textInputChange: false,
    check_emailInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidEmail: true,
    isValidPassword: true,
    next: true,
  });

  // const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        userName: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        userName: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const textInputEmailChange = (val) => {
    if (val.trim().length >= 4 && val.includes('@') && val.includes('.')) {
      setData({
        ...data,
        email: val,
        check_emailInputChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_emailInputChange: false,
        isValidEmail: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const handleValidEmail = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        isValidEmail: false,
      });
    }
  };

  const registerUser = (email, password, userName) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // console.log(res)
        console.log('User account created & signed in!');
        addUser(user.user.uid, email, userName);
        //  console.log(user.user.uid)
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setError('That email address is invalid!');
        }
        // console.error(error);
      });
  };

  const addUser = (userId, email, userName) => {
    const userDetails = {
      userId: userId,
      email: email,
      userName: userName,
      createdAt: new Date().toISOString(),
    };

    firestore()
      .collection('users')
      .doc(userId)
      .set(userDetails)
      .then(() => {
        storeUserProfile(userDetails);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  };

  const storeUserProfile = async (userDetails) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(userDetails));
      console.log('Profile stored');
      setUserProfile(userDetails);
      navigation.navigate('Home');
    } catch {
      setError('Error storing data on device');
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor='#009387' barStyle="light-content"/> */}

      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image
          style={{width: 250, height: 30, marginTop: 15}}
          source={require('../img/logo.png')}
        /> */}

          <Text style={styles.text_header}>Sign Up</Text>
        </View>

        {
          //  show this if user is logged in

          <Animatable.View
            animation="fadeInUpBig"
            style={[
              styles.footer,
              {
                backgroundColor: '#fff',
              },
            ]}>
            <ScrollView>
              {/* emaail section */}
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: '#23395d',
                  },
                ]}>
                Email
              </Text>

              <View style={styles.action}>
                <FontAwesome name="user-o" color="#000" size={20} />
                <TextInput
                  placeholder="Your email"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    {
                      color: '#000',
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputEmailChange(val)}
                  onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                />
                {data.check_emailInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidEmail ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Invalid email address</Text>
                </Animatable.View>
              )}

              {/* usernamre */}
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 15,
                    color: '#23395d',
                  },
                ]}>
                userName
              </Text>

              <View style={styles.action}>
                <FontAwesome name="user-o" color="#000" size={20} />
                <TextInput
                  placeholder="Your userName"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    {
                      color: '#000',
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChange(val)}
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidUser ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    userName must be 4 characters long.
                  </Text>
                </Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    color: '#23395d',
                    marginTop: 15,
                  },
                ]}>
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color={'#000'} size={20} />
                <TextInput
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={[
                    styles.textInput,
                    {
                      color: '#000',
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {data.isValidPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Password must be 8 characters long.
                  </Text>
                </Animatable.View>
              )}

              {/* <TouchableOpacity>
          <Text style={{color: '#37018D', marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity> */}

              {error && <Text style={styles.errorMsg}>{error}</Text>}

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {
                    registerUser(data.email, data.password, data.userName);
                  }}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <Text style={{color: '#000', margin: 10, fontSize: 18}}>
                  Already have an account ?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignIn')}
                  style={[
                    styles.signIn,
                    {
                      borderColor: '#37018D',
                      borderWidth: 1,
                      marginTop: 15,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    SignIn
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animatable.View>
        }
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23395d',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 25,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#23395d',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnContinue: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#23395d',
    alignItems: 'center',
  },
});
