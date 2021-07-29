/* Firebase */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function purgeMessages(rid) {
//   navigation.popToTop();
  firestore()
    .collection('messages')
    .doc(rid)
    .delete()
    .then(() => {
      console.log('room messages purged...');
    })
    .catch(e => console.log(e));
}

export function deleteRoom(rid) {
  // setLoading(true);
  firestore()
    .collection('rooms')
    .doc(rid)
    .get()
    .then(res => {
      //console.log(res.data().members[0]);
      if (res.data().members[0] == auth().currentUser.uid) {
        firestore()
          .collection('rooms')
          .doc(rid)
          .delete()
          .then(() => {
            //   setLoading(false);
            Alert.alert('Success!', 'Group deleted successfully!', [
              {
                text: 'Ok',
                onPress: () => {
                  purgeMessages(rid);
                },
              },
            ]);
          })
          .catch(e => console.log(e));
      } else {
        //   setLoading(false);
        Alert.alert('Error!', 'Only Room Creator can delete group!', [
          {
            text: 'Ok',
            onPress: () => console.log('not the creator, ....'),
          },
        ]);
      }
    })
    .catch(e => console.log(e));
}

export function leaveRoom(rid) {
  // setLoading(true);
  firestore()
    .collection('rooms')
    .doc(rid)
    .update({
      members: firestore.FieldValue.arrayRemove(auth().currentUser.uid),
    })
    .then(async () => {
      await firestore()
        .collection('rooms')
        .doc(rid)
        .get()
        .then(res => {
          if (res.data().members.length == 0) {
            firestore()
              .collection('rooms')
              .doc(rid)
              .delete()
              .then(() => {
                Alert.alert('Success!', 'Room Left', [
                  {
                    text: 'Ok',
                    onPress: () => {
                      purgeMessages();
                    },
                  },
                ]);
              })
              .catch(e => console.log(e));
          }
          //   setLoading(false);
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
}
