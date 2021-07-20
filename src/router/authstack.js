/* React & React Native imports */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/* Screens */
import Login from '../screens/login';
import Register from '../screens/register';

const Stack = createStackNavigator();

const AuthStack = () => {
    return(
        <Stack.Navigator headerMode="none">
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
    );
}

export default AuthStack;