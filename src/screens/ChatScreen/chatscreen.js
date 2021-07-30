/* React & React Native imports */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, Alert, Keyboard} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GiftedChat, Bubble, Time, InputToolbar, Composer} from 'react-native-gifted-chat';

/*componenets*/
import Loading from "../../components/loading";

/*Functions */
import { onSend } from './helper';

/*firebase*/
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isTyping, setTyping] = useState(false);
  const [send, setSend] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
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
    setMessages(QuerySnapshot.data().messages.reverse());
  }

  function onError(error) {
    Alert.alert(
      'Error!',
      'Message to retrieve messages!Is your internet on?',
      [
        {
          text: 'Ok',
          onPress: () => {
            console.log('failed to retrieve message')
          }
        }
      ]
    )
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setTyping(true);
        setKeyboardVisible(true); 
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setTyping(false);
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        // inverted={false}
        text={text}
        onInputTextChanged={text => {
          setText(text);
        }}
        onSend={messages => {
          setSend(true);
          onSend(messages, text, uid, name, rid);
          setSend(false);
        }}
        renderUsernameOnMessage={true}
        multiline={false}
        user={{
          _id: uid,
          name: name,
        }}
        isTyping={isTyping}
        renderLoading={() => {
          return(
            <View style={{marginTop: hp('40%'), marginHorizontal: wp('20%')}}>
        <Loading />
      </View>
          )
        }}
        renderInputToolbar={props => {
          return(
            <InputToolbar 
              {...props}
              renderComposer={props => {
                return(
                  <Composer 
                    {...props}
                    textInputStyle={{
                      color: '#000000'
                    }}
                  />
                )
              }}
            />
          )
        }}
        renderAvatarOnTop={true}
        scrollToBottom={true}
        renderBubble={props => {
          return(
            <Bubble 
              {...props}
              textStyle={{
                right: {
                  color: 'white'
                }
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "#dfe6e9",
                }
              }}
              renderTime={props => {
                return(
                  <Time 
                    {...props}
                    timeTextStyle={{
                      left: {
                        color: '#2c3e50'
                      }      
                    }}
                  />
                )
              }}
            />
          )
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    borderRadius: 100,
    marginHorizontal: wp('2%'),
    
  },
});

export default ChatScreen;