/* React & React Native imports */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
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
  const [isTyping, setTyping] = useState(false);
  const [send, setSend] = useState(false);
  const {rid, members} = route.params;

  const uid = auth().currentUser.uid;
  const name = uid.slice(uid.length - 4, uid.length);

  /*listener */
  useEffect(() => {
    console.log('listner.....')
    const subscriber = firestore()
    .collection('messages')
    .doc(rid)
    .onSnapshot(onResult, onError);
    return () => subscriber();
  },[]);

  function onResult(QuerySnapshot) {
    setMessages(QuerySnapshot.data().messages);
  }

  function onError(error) {
    console.error(error);
  }

  /* on send */
  async function onSend(message, text) {
    setTyping(false);
    setSend(true);
    // console.log('sending message to db...')
    // console.log(message.map(a => a.createdAt));
    console.log(text);
    await firestore()
      .collection('messages')
      .doc(rid)
      .update({
        messages: firestore.FieldValue.arrayUnion({
          _id: message.map(a => a._id),
          text: text,
          createdAt: new Date().toUTCString(),
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
              sentBy: name,
            },
            sentAt: message.map(a => a.createdAt),
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
        inverted={false}
        text={text}
        onInputTextChanged={text => setText(text)}
        onSend={messages => onSend(messages, text)}
        user={{
          _id: uid,
          name: name,
        }}
        renderAvatarOnTop={true}
        scrollToBottom={true}
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
