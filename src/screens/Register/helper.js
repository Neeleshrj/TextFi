/* Firebase */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/* React */
import { Alert } from 'react-native';

export async function register(email,pass,cpass) {
    // setLoading(true);
    try {
        if(pass!= cpass)
        {
            Alert.alert(
                'Error!',
                'Password and Confirm Passowrd do not match!',
                [
                    {
                        text: 'Retry',
                        onPress: () => console.log('retry..'),
                        style: 'cancel'
                    }
                ]
            )
        }
        else{
            await auth().createUserWithEmailAndPassword(email, pass)
            .then(() => {
                // setLoading(false);
                firestore().collection('users').doc(auth().currentUser.uid)
                .set({
                    email: email,
                    uid: auth().currentUser.uid
                })
                .catch(error => {
                    console.log('Error Adding to Firestore: ', error);
                })
            })
            .catch(error => {
                Alert.alert(
                    'Error!',
                    error.code,
                    [
                        {
                            text: 'Retry',
                            onPress: () => console.log('sign up failed..'),
                            style: 'cancel'
                        }
                    ]
                );
                // setLoading(false);
            });
        }
        
      }catch(e){
        console.log('Error:',e);
        // setLoading(false);
    }
}