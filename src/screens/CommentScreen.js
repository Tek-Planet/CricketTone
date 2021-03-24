import React, {useState, useEffect, useContext} from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import  {AuthContext} from  '../context/AuthProvider'


function CommentScreen({match}) {
  const { user } = useContext(AuthContext);
  dayjs.extend(relativeTime);
  const [state, setState] = useState({
    comments: [],
    body: '',
    name:'', 
    email:''
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
        }}>
        <Image
          style={{width: 50, height: 50, borderRadius: 100, margin: 10}}
          source={item.image}
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
              marginTop: 5,
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
    if (state.body.length > 0) {
      const newComments = {
        body: state.body,
        matchId: match.key,
        teamId: 'teamId 002',
        userId: 'anonymous',
        userName: 'Anonymous',
        createdAt: new Date().toISOString(),
      };

      firestore()
        .collection('messages')
        .add(newComments)
        .then(() => {
          console.log('User added!');
          setState({
            ...state,
            comments: state.comments.push(newComments),
          });
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
            image: require('../assets/flag.png'),
          });
        });
        setState({
          ...state,
          comments: msgs,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

 
  const textInputChange = (val) => {

    if (val.trim().length > 0 ) {
      setState({
        ...state,
        body: val,
      });
    }
    else{
      setState({
        ...state,
        body: '',
      });
    }
  };

  const handleNameChange = (val) => {

    if (val.trim().length > 0 ) {
      setState({
        ...state,
        name: val,
      });
    }
    else{
      setState({
        ...state,
        name: '',
      });
    }
  };

  const handleMailChange = (val) => {

    if (val.trim().length > 0 ) {
      setState({
        ...state,
        email: val,
      });
    }
    else{
      setState({
        ...state,
        email: '',
      });
    }
  };


  return (
    <View style={{flex: 1}}>
      <View >
        <View style={styles.headingBox}>
          <Text style={styles.headingText}>Recent Comments </Text>
        </View>
        <FlatList
          data={state.comments}
          renderItem={({item}) => {
            return messageListItem(item);
          }}
          keyExtractor={(item) => item.title}
        />
      </View>

      <View >
        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            numberOfLines={5}
            placeholder="Description"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            style={styles.input}
          />
        </View>

        { user ? (
        <View>
          <TextInput
          placeholder="Name"
          placeholderTextColor="#666666"
          autoCapitalize="none"
          onChangeText={(val) => handleNameChange(val)}
          style={styles.inputDetails}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#666666"
          autoCapitalize="none"
          onChangeText={(val) => handleMailChange(val)}
          style={styles.inputDetails}
        />
        </View>
      ) : (null)}

        <Text style={{color:'#000'}}>{state.body}</Text>
       <Text style={{color:'#000'}}>{state.email}</Text>
       <Text style={{color:'#000'}}>{state.name}</Text>

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

  headingText: {color: '#FFF', fontSize: 22, fontWeight: 'bold'},

  scoreBox: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 5,
  },

  imgFlag: {width: 30, height: 30, borderRadius: 100},

  teamName: {color: '#000', fontSize: 20, fontWeight: 'bold'},

  subTeamName: {color: '#000', fontSize: 16, textAlign: 'center'},

  team: {flexDirection: 'column', alignItems: 'center'},

  row: {flexDirection: 'row'},

  score: {color: '#000', fontSize: 16, marginTop: 10},

  seperator: {color: '#000', fontSize: 18, fontWeight: 'bold'},

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
    backgroundColor: '#fff',
  },
});
