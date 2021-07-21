/* React & React Native imports */
import  React, { useEffect, useState } from 'react';
import { SafeAreaView,StyleSheet, ScrollView} from 'react-native';
import { SpeedDial } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


/* Components*/
import Chat from '../components/chatbox';
import Overlay from '../components/overlay';

const ChatList = ({navigation}) => {
    const [open, setOpen] = useState(false);
    const [visible,setVisible] = useState(false);
    const [placeholder, setPlaceholder] = useState('');
    const [buttonTitle, setButtonTitle] = useState('');

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
                    onPress={() => {setVisible(true);setPlaceholder('Enter Chat Room Name');setButtonTitle('Create')}}
                    color='#6c5ce7'
                />
                <SpeedDial.Action
                    icon={{ name: 'group', color: '#fff' }}
                    title="Join"
                    onPress={() => {setVisible(true);setPlaceholder('Enter Room Code');setButtonTitle('Join')}}
                    color='#6c5ce7'
                />
            </SpeedDial>
            <Overlay visible={visible} toggleOverlay={() => setVisible(!visible)} buttonTitle={buttonTitle} placeholder={placeholder}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default ChatList;