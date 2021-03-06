/* React & React Native imports */
import React, { useState } from 'react';
import { SafeAreaView, View,StyleSheet, ScrollView, Alert} from 'react-native';
import { Text, SocialIcon, Divider, Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/* Components*/
import InputBox from '../../components/inputbox';
import SolidButton  from '../../components/button';

/* Functions */
import {login} from './helper';


const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text h1 h1Style={styles.headerText}>Welcome Back!</Text>
                </View>
                <View style={styles.input}>
                    <InputBox placeholder="Email" type={false} icontype="envelope" iconColor='#6c5ce7' value={email} onChangeText={email => setEmail(email)}/>
                    <InputBox placeholder="Password" type={true} icontype="lock" iconColor='#6c5ce7' value={pass} onChangeText={pass => setPass(pass)}/>
                </View>
                <View style={styles.google}>
                    <SolidButton 
                        title='Sign In' 
                        icontype='arrow-right' 
                        iconcolor='#ffffff' 
                        buttonColor='#d63031' 
                        loading={loading} 
                        onPress={() => {
                            setLoading(true);
                            login(email,pass);
                            setLoading(false);
                        }} 
                    />
                    {/* <SocialIcon 
                        title='Sign In With Google'
                        button={true}
                        type='google'
                        loading={false}
                        style={{padding: hp('2%'), backgroundColor: '#4285F4'}}
                    />    */}
                </View>
                <View style={styles.bottomContainer}>
                    <Divider orientation='horizontal' subHeader='New here?' width={wp('0.5%')} subHeaderStyle={styles.subHeader}/>
                    <Button title='Sign Up' type='clear' buttonStyle={styles.signin} onPress={()=> navigation.navigate('register')}/>
                    <Button title='Forgot Password?' type='clear' buttonStyle={styles.forgotpass} onPress={()=> navigation.navigate('forgotpass')}/>  
                </View>
            </ScrollView>    
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: hp('3%'),  
        backgroundColor: '#6c5ce7',
    },
    headerText: {
        marginHorizontal: wp('1%'),
        color: '#ffffff'
    },
    input: { 
        marginHorizontal: wp('4%'),
        marginTop: hp('4%'),
    },
    google: { 
        //marginHorizontal: wp('10%'),
    },
    bottomContainer: {
        marginVertical: hp('3%'),
    },
    subHeader: {
        fontSize: hp('2.5%'),
        textAlign: 'center',
        color: '#636e72',
        marginTop: hp('2%')
    },
    signin: {
        marginHorizontal: wp('40%')
    },
    forgotpass: {
        marginHorizontal: wp('0%')
    }
});

export default Login;