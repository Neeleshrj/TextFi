/* React & React Native imports */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

/* Screens */
import Login from '../screens/Login/login';
import Register from '../screens/Register/register';
import ForgotPass from '../screens/ForgotPass/forgotPass';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name="login" component={Login} />
      <Stack.Screen options={{headerShown: false}} name="register" component={Register} />
      <Stack.Screen
        name="forgotpass"
        component={ForgotPass}
        options={{
          title: 'Forgot Password',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
