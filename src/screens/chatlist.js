/* React & React Native imports */
import  React, { useState } from 'react';
import { SafeAreaView, View,StyleSheet, ScrollView, Alert} from 'react-native';
import { Text,SpeedDial } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


/* Components*/
import Chat from '../components/chatbox';

const ChatList = ({navigation}) => {
    const [open, setOpen] = useState(false);
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Chat chatName='chat 1' notifications='89' recent='Recent Text' onPress={() => navigation.navigate('chatscreen')}/>
            </ScrollView>
            <SpeedDial
                isOpen={open}
                icon={{ name: 'add', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
                color='#6c5ce7'
            >
                <SpeedDial.Action
                    icon={{ name: 'add', color: '#fff' }}
                    title="Create"
                    onPress={() => console.log('Create Chat')}
                    color='#6c5ce7'
                />
                <SpeedDial.Action
                    icon={{ name: 'group', color: '#fff' }}
                    title="Join"
                    onPress={() => console.log('Join chat')}
                    color='#6c5ce7'
                />
            </SpeedDial>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default ChatList;