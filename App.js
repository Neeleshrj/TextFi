import React, { useState, useEffect }from 'react';
import Login from './src/screens/login';
import ChatList from './src/screens/chatlist';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

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
      <SafeAreaProvider>
        <Login />
      </SafeAreaProvider>
    );
  }
  return (
    <SafeAreaProvider>
      <ChatList />
    </SafeAreaProvider>
  );
};

export default App;
