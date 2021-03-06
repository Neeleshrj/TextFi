/* React & React Native imports */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

/* Screens*/
import ChatList from '../screens/ChatList/chatlist';
import ChatScreen from '../screens/ChatScreen/chatscreen';
import Settings from "../screens/Settings/setttings";
import Logout from "../screens/Logout/logout";
import ChatInfo from "../screens/ChatInfo/chatinfo";



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
        options={({navigation}) => ({
          headerTitle: 'Chats',
          headerRight: () => (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                <Icon name='cog' type='font-awesome' color='#ffffff' style={{padding: hp('2%')}}/>
              </TouchableOpacity>
            </>
          ),
        })}
      />
      <Stack.Screen
        name="chatscreen"
        component={ChatScreen}
        options={({navigation,route}) => ({
          headerTitle: route.params.screenName,
          headerRight: () => (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('chatinfo',{
                rid: route.params.rid
              })}>
                <Icon name='info-circle' type='font-awesome' color='#ffffff' style={{padding: hp('2%')}}/>
              </TouchableOpacity>
              {/* <CopiedModal visible={modalVisible} text="Room Code copied!" />
              setModalVisible(true);
                Clipboard.setString(route.params.rid);
                setTimeout(() => {
                  setModalVisible(false);
                },1000) */}
            </>
          ),
        })}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen 
        name="chatinfo"
        component={ChatInfo}
        options={{
          title: 'Information'
        }}
      />
      <Stack.Screen
        name="logout"
        component={Logout}
        headerMode='none'
      />
    </Stack.Navigator>
  );
};

export default RootStack;
