/* React & React Native imports */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

/* Navigator imports */
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/router/authstack';
import RootStack from './src/router/rootstack';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
        <AuthStack />
      </SafeAreaProvider>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
