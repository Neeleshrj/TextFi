import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const InputBox = ({placeholder,type,icontype,iconColor,value,onChangeText}) =>{
    return(
        <Input 
            placeholder={placeholder}
            secureTextEntry={type}
            inputStyle={styles.input}
            leftIcon={<Icon name={icontype} size={24} color={iconColor} />}
            value={value}
            onChangeText={onChangeText}
        />
    );
};

const styles = StyleSheet.create({
    input:{
        width: wp('80%'),
        height: hp('7%'),
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('5%'),
        fontSize: hp('3%'),
    }
});

export default InputBox;