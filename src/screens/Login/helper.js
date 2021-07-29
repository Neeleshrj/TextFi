/* Firebase */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/* React */
import {Alert} from 'react-native';

export async function login(email, pass) {
  // setLoading(true);

  try {
    if (email != '' && pass != '') {
      await auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          // setLoading(true);
        })
        .catch(error => {
          Alert.alert('Error!', error.code, [
            {
              text: 'Retry',
              onPress: () => console.log('sign in failed..'),
              style: 'cancel',
            },
          ]);
          // setLoading(false);
        });
    } else {
      Alert.alert('Error!', 'Email or Password cannot be empty!', [
        {
          text: 'Retry',
          onPress: () => console.log('Empty ...'),
          style: 'cancel',
        },
      ]);
    }
  } catch (e) {
    Alert.alert('Error!', e.code, [
      {
        text: 'Retry',
        onPress: () => console.log('sign in failed..'),
        style: 'cancel',
      },
    ]);
    // setLoading(false);
  }
}
