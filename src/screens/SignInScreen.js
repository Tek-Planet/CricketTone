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
import SocialButton from '../components/SocialButton';

import {useTheme} from 'react-native-paper';

import {AuthContext} from '../context/AuthProvider';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignInScreen = ({navigation}) => {
  const {
    user,
    error,
    setError,
    setUserProfile,
    googleLogin,
    fbLogin,
    fetchLikes,
    loginUser,
  } = useContext(AuthContext);

  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_emailInputChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
    next: true,
  });

  const {colors} = useTheme();

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
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image
          style={{width: 250, height: 30, marginTop: 15}}
          source={require('../img/logo.png')}
        /> */}
          <Text style={styles.text_header}>Sign in now</Text>
        </View>

        {
          //  show this if user is logged in
          user ? null : (
            //  if user not logged in show this
            <Animatable.View
              animation="fadeInUpBig"
              style={[
                styles.footer,
                {
                  backgroundColor: colors.background,
                },
              ]}>
              <ScrollView>
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
                    autoCompleteType="email"
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

                <Text
                  style={[
                    styles.text_footer,
                    {
                      color: '#23395d',
                      marginTop: 35,
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

                {error && (
                  <View style={styles.error}>
                    <Text style={styles.errorMsg}>{error}</Text>
                  </View>
                )}
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {
                      loginUser(data.email, data.password, navigation);
                    }}>
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

                  {Platform.OS === 'android' ? (
                    <View>
                      <SocialButton
                        buttonTitle="Sign In with Facebook"
                        btnType="facebook"
                        color="#4867aa"
                        backgroundColor="#e6eaf4"
                        onPress={() => fbLogin(navigation)}
                      />

                      <SocialButton
                        buttonTitle="Sign In with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => googleLogin(navigation)}
                      />
                    </View>
                  ) : null}

                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    style={{margin: 15}}>
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: '#23395d',
                        },
                      ]}>
                      Don't have an account? Create here
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Animatable.View>
          )
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
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
