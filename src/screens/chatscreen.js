import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Text} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Anonymous 2',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text h1 h1Style={styles.headerText}>
          ChatScreen
        </Text>
      </View>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
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
  header: {
    padding: hp('2%'),
    backgroundColor: '#6c5ce7',
  },
  headerText: {
    marginHorizontal: wp('2%'),
    color: '#ffffff',
    fontSize: hp('5%'),
  },
});

export default ChatScreen;
