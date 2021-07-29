/* React */
import React from 'react';
import {ListItem, Icon} from 'react-native-elements';
import {View} from 'react-native';

const Settings = ({navigation}) => {
  const list = [
    {
      title: 'Forgot Password',
      icon: 'lock-clock',
      route: 'forgot-pass'
    },
    {
      title: 'Logout',
      icon: 'logout',
      route: 'logout'
    },
  ];

  return (
    <View style={{backgroundColor: 'red'}}>
      {list.map((item, i) => (
        <ListItem key={i} bottomDivider onPress={() => navigation.navigate(item.route)}>
          <Icon name={item.icon} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </View>
  );
};

export default Settings;
