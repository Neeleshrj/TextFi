import React, {useState} from 'react';
import {Text} from 'react-native-elements';

/* components */
import Loading from '../components/loading';

/* firebase */
import auth from '@react-native-firebase/auth';

const Logout = () => {
  const [loading, setLoading] = useState(true);

  auth()
    .signOut()
    .then(() => {
      console.log('logged out');
      setLoading(false);
    });

  if (loading) {
    return (
      <View style={{marginTop: hp('40%'), marginHorizontal: wp('20%')}}>
        <Loading />
      </View>
    );
  } else {
    return <Text h1>Logged out!</Text>;
  }
};

export default Logout;
