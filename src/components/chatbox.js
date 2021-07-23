import React, { useState } from 'react';
import { View,StyleSheet, TouchableOpacity} from 'react-native';
import { Badge, Text } from 'react-native-elements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ChatBox = ({chatName,recent,notifications,onPress}) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}> 
                <View style={styles.chatNameBox}>
                    <View style={styles.chatDetails}>
                        <Text h4 h4Style={styles.chatName}>{chatName}</Text>
                        <Text style={styles.recentText}>{recent}</Text>
                    </View>
                </View>
                <View style={styles.badgeBox}>
                    <Badge value={notifications} status='success' />
                </View>
                
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#b2bec3',
        borderTopColor: '#b2bec3',
        borderWidth: 1,
        backgroundColor: '#dfe6e9'
    },
    chatNameBox: {
        flex: 6,
        //backgroundColor: 'blue',
        padding: hp('0.25%')
    },
    chatDetails: {
        //backgroundColor: 'red',
        padding: hp('1%')
    },
    chatName: {
        fontSize: hp('4%')
    },
    badgeBox: {
        flex: 1,
        //backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    recentText: {
        fontSize: hp('2.25%'),
        //backgroundColor: 'orange'
    }
});

export default ChatBox;