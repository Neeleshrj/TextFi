/* React & React Native imports */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/* Screens*/
import ChatList from '../screens/chatlist';
import ChatScreen from '../screens/chatscreen';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#ffffff',
        headerStyle: {backgroundColor: '#6c5ce7', height: hp('8%')},
        headerTitleStyle: {color: '#ffffff', fontSize: hp('3.5%')},
      }}>
      <Stack.Screen
        name="chatlist"
        component={ChatList}
        options={{title: 'Chats'}}
      />
      <Stack.Screen
        name="chatscreen"
        component={ChatScreen}
        options={{
          title: 'Chat Screen',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
