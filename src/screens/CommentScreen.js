import React, {useState, useEffect, useContext} from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  LogBox,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {AuthContext} from '../context/AuthProvider';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

function CommentScreen({match}) {
  const {user, userProfile} = useContext(AuthContext);
  dayjs.extend(relativeTime);
  const [body, setBody] = useState(null);
  const [comments, setComments] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState({
    name: user && userProfile ? userProfile.userName : '',
    email: user && userProfile ? userProfile.email : '',
    userId: user && userProfile ? userProfile.userId : 'anonymous',
  });

  useEffect(() => {
    setTimeout(() => {
      getComments();
    }, 5000);
  }, []);

  const messageListItem = (item) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          elevation: 5,
          borderRadius: 10,
          padding: 10,
        }}>
        <Image
          style={{width: 50, height: 50, borderRadius: 100, margin: 10}}
          source={require('../assets/imgs/noImage.png')}
        />

        <View style={{width: '75%'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#000',
              marginTop: 10,
            }}>
            {item.userName}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontStyle: 'italic',
              color: '#000',
              marginTop: -3,
            }}>
            {' '}
            {dayjs(item.createdAt).fromNow()}
          </Text>
          <Text
            style={[
              {
                paddingBottom: 10,
                marginTop: 5,
                fontSize: 16,
                textAlign: 'justify',
                color: '#000',
                lineHeight: 20,
              },
            ]}>
            {item.body}
          </Text>
        </View>
      </View>
    );
  };

  const saveComment = () => {
    if (body.trim().length > 0) {
      const newComments = {
        body: body,
        matchId: match.key,
        teamId: 'teamId 002',
        userId: state.userId,
        email: state.email,
        userName: state.name,
        createdAt: new Date().toISOString(),
      };

      firestore()
        .collection('messages')
        .add(newComments)
        .then(() => {
          // getComments()
          comments.push(newComments);
          console.log('User added!');
          setBody('');
        })
        .catch((error) => {
          console.error(error);
        });
    } else alert('comment body cannot be empty');
  };

  const getComments = () => {
    firestore()
      .collection('messages')
      .where('matchId', '==', `${match.key}`)
      .orderBy('createdAt', 'desc')
      .get()
      .then((data) => {
        let msgs = [];
        data.forEach((doc) => {
          msgs.push({
            commentId: doc.id,
            body: doc.data().body,
            matchId: doc.data().matchId,
            teamId: doc.data().teamId,
            userId: doc.data().userId,
            userName: doc.data().userName,
            createdAt: doc.data().createdAt,
            // image: require('../assets/imgs/noImage.png'),
          });
        });
        setComments(msgs);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const textInputChange = (val) => {
    if (val.trim().length > 0) {
      setBody(val);
    } else setBody(val);
  };

  const handleNameChange = (val) => {
    if (val.trim().length > 0) {
      setState({
        ...state,
        name: val,
      });
    } else {
      setState({
        ...state,
        name: '',
      });
    }
  };

  const handleMailChange = (val) => {
    if (val.trim().length > 0) {
      setState({
        ...state,
        email: val,
      });
    } else {
      setState({
        ...state,
        email: '',
      });
    }
  };

  return (
    <View style={{marginBottom: 100}}>
      <View>
        <View style={styles.headingBox}>
          <Text style={styles.headingText}>Recent Comments </Text>
        </View>
        {!loaded ? (
          <ActivityIndicator color="#23395d" size="large" />
        ) : (
          <FlatList
            data={comments}
            renderItem={({item}) => {
              return messageListItem(item);
            }}
            keyExtractor={(item) => item.title}
          />
        )}
      </View>

      <View style={styles.scoreBox}>
        <View style={styles.inputContainer}>
          <TextInput
            value={body}
            multiline={true}
            numberOfLines={5}
            placeholder="Description"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            style={styles.input}
          />
        </View>
        {/* Team Name View */}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              alert('Team');
            }}
            style={styles.teamButton}>
            <Text
              style={{
                color: '#23395d',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              ABC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              alert('Team');
            }}
            style={styles.teamButton}>
            <Text
              style={{
                color: '#23395d',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              ABC
            </Text>
          </TouchableOpacity>
        </View>

        {!user ? (
          <View>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              onChangeText={(val) => handleNameChange(val)}
              style={styles.inputDetails}
            />

            <TextInput
              value={state.email}
              placeholder="Email"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              onChangeText={(val) => handleMailChange(val)}
              style={styles.inputDetails}
            />
          </View>
        ) : null}

        {/* <Text style={{color:'#000'}}>{state.body}</Text>
       <Text style={{color:'#000'}}>{state.email}</Text>
       <Text style={{color:'#000'}}>{state.name}</Text> */}

        <TouchableOpacity
          onPress={() => {
            saveComment();
          }}
          style={[
            styles.signIn,
            {
              borderColor: '#23395d',
              borderWidth: 1,
              marginTop: 15,
            },
          ]}>
          <Text
            style={[
              styles.textSign,
              {
                color: '#23395d',
              },
            ]}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CommentScreen;

const styles = StyleSheet.create({
  headingBox: {
    padding: 10,
    backgroundColor: '#23395d',
    margin: 5,
    borderRadius: 10,
  },

  headingText: {color: '#FFF', fontSize: 18, fontWeight: 'bold'},

  scoreBox: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },

  inputContainer: {
    margin: 5,
    borderRadius: 5,
    borderLeftWidth: 4,
    borderRightWidth: 4,
  },

  input: {
    textAlignVertical: 'top',
    backgroundColor: '#ccc',
    paddingLeft: 15,
    paddingRight: 15,
  },

  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputDetails: {
    margin: 10,
    backgroundColor: '#ccc',
  },
  teamButton: {
    width: 50,
    borderWidth: 1,
    margin: 3,
  },
});
