import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ModalButton = ({title,icontype,iconcolor,buttonColor,loading,onPress}) => {
    return(
        <Button    
            title={title}
            type='solid'
            buttonStyle={[styles.button,{backgroundColor: buttonColor}]}
            loading={loading}
            icon={
                <Icon 
                    name={icontype}
                    type='font-awesome'
                    size={22}
                    color={iconcolor}
                    style={styles.icon}
                />
            }
            iconRight
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        padding: hp('1%'),
    },
    icon:{
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%')
    }
});

export default ModalButton;