/* React */
import React, {useState} from 'react';
import {ListItem, Icon} from 'react-native-elements';
import {View, Alert} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

/* Components */
import CopiedModal from '../components/copiedModal';
import Loading from '../components/loading';

/* Firebase */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ChatInfo = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {rid} = route.params;

  function deleteRoom() {
    setLoading(true);
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
              setLoading(false);
              Alert.alert('Success!', 'Group deleted successfully!', [
                {
                  text: 'Ok',
                  onPress: () => {
                    navigation.popToTop();
                    firestore()
                      .collection('messages')
                      .doc(rid)
                      .delete()
                      .then(() => {
                        console.log('room messages purged...');
                      })
                      .catch(e => console.log(e));
                  },
                },
              ]);
            })
            .catch(e => console.log(e));
        } else {
          setLoading(false);
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

  const list = [
    {
      title: 'Copy Room Code',
      icon: 'content-copy',
      functionality: 'copy',
    },
    {
      title: 'Leave Room',
      icon: 'exit-to-app',
      functionality: 'leave',
    },
    {
      title: 'Delete',
      icon: 'delete',
      functionality: 'delete',
    },
  ];

  function roomFunction(functionality) {
    switch (functionality) {
      case 'copy':
        setModalVisible(true);
        Clipboard.setString(rid);
        setTimeout(() => {
          setModalVisible(false);
        }, 500);
        break;
      case 'leave':
        Alert.alert('Caution!', 'Are you sure you want to leave this room?', [
          {
            text: 'Yes',
            onPress: () => {
              setLoading(true);
              firestore()
                .collection('rooms')
                .doc(rid)
                .update({
                  members: firestore.FieldValue.arrayRemove(
                    auth().currentUser.uid,
                  ),
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
                                  navigation.popToTop();
                                  firestore()
                                    .collection('messages')
                                    .doc(rid)
                                    .delete()
                                    .then(() => {
                                      console.log('room messages purged...');
                                    })
                                    .catch(e => console.log(e));
                                },
                              },
                            ]);
                          })
                          .catch(e => console.log(e));
                      }
                      setLoading(false);
                    })
                    .catch(e => console.log(e));
                })
                .catch(e => console.log(e));
            },
          },
          {
            text: 'No',
            onPress: () => console.log('cancel..'),
            style: 'cancel',
          },
        ]);
        break;
      case 'delete':
        Alert.alert(
          'Caution!',
          'Are you sure you want to Delete this room?This action cannot be reversed!',
          [
            {
              text: 'Yes',
              onPress: () => {
                deleteRoom();
              },
            },
            {
              text: 'No',
              onPress: () => console.log('Canceled...'),
              style: 'cancel',
            },
          ],
        );
        break;
    }
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{backgroundColor: 'red'}}>
      {list.map((item, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => roomFunction(item.functionality)}>
          <Icon name={item.icon} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
      <CopiedModal visible={modalVisible} text="Room Code copied!" />
    </View>
  );
};

export default ChatInfo;
