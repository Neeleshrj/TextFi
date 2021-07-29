/* React */
import React, {useState} from 'react';
import {ListItem, Icon} from 'react-native-elements';
import {View, Alert} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

/* Components */
import TempModal from '../../components/tempModal';
import Loading from '../../components/loading';

/* Function */
import { deleteRoom, leaveRoom } from './helper';

const ChatInfo = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {rid} = route.params;

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
              leaveRoom(rid);
              setLoading(false);
              navigation.popToTop();
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
                setLoading(true);
                deleteRoom(rid);
                setLoading(false);
                navigation.popToTop();
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
      <TempModal visible={modalVisible} text="Room Code copied!" />
    </View>
  );
};

export default ChatInfo;
