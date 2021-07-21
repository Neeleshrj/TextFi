/* Firebase */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const getMedList = () => {
    return async function(dispatch){
        console.log('getting chat list...');
        await firestore()
        .collection('rooms')
        .where('members','array-contains-any',[auth().currentUser.uid])
    };
};