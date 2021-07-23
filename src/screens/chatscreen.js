/* React & React Native imports */
import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, View, StyleSheet, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GiftedChat} from 'react-native-gifted-chat';

/*firebase*/
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [send, setSend] = useState(false);
  const [reRender, setRender] = useState(false);
  const {rid, members} = route.params;
  
  const uid = auth().currentUser.uid;
  const name = uid.slice(uid.length - 4, uid.length);

  useEffect(async () => {
    if(reRender){
      await firestore()
      .collection('messages')
      .doc(rid)
      .get()
      .then( res => {console.log(res)})
    }
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'Anonymous 2',
    //     },
    //   },
    // ]);
  }, []);


  firestore().collection('messages').doc(rid).onSnapshot(onResult, onError);

  function onResult(QuerySnapshot) {
    setRender(true);
  }

  function onError(error) {
    console.error(error);
  }

  console.log(messages);
  useEffect(async () => {
    if(reRender){
      await firestore()
      .collection('messages')
      .doc(rid)
      .get()
      .then( res => {
        // setRender(false);
        console.log(res);
      })
    }
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'Anonymous 2',
    //     },
    //   },
    // ]);
    return () => subscriber();
  }, [reRender]);

  async function onSend(message, text) {
    setSend(true);
    // console.log('sending message to db...')
    // console.log(message.map(a => a.createdAt));
    console.log(text);
    await firestore()
      .collection('messages')
      .doc(rid)
      .update({
        messages: firestore.FieldValue.arrayUnion({
          _id: uid,
          text: text,
          createdAt: new Date(),
          user: {
            _id: uid,
            name: name,
          },
        }),
      })
      .then(async () => {
        console.log('sent!');
        setSend(false);
        await firestore()
        .collection('rooms')
        .doc(rid)
        .update({
          recent: {
            message: text,
            sentAt: message.map(a => a.createdAt),
            sentBy: name,
          }
        })
        .catch(e => console.log(e));
      })
      .catch(e => {
        console.log(e);
        setSend(false);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        text={text}
        onInputTextChanged={text => setText(text)}
        isTyping={true}
        onSend={messages => onSend(messages, text)}
        user={{
          _id: uid,
          name: name,
        }}
        style={{backgroundColor: 'blue'}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
