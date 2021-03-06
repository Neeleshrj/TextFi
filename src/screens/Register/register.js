/* React & React Native imports */
import React, { useState } from 'react';
import { SafeAreaView, View,StyleSheet, ScrollView } from 'react-native';
import { Text, SocialIcon, Divider, Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/* Functions */
import {register} from './helper';

/* Components*/
import InputBox from '../../components/inputbox';
import SolidButton  from '../../components/button';


const Register = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [loading, setLoading] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text h1 h1Style={styles.headerText}>Welcome To TextFi !</Text>
                </View>
                <View style={styles.input}>
                    <InputBox placeholder="Email" type={false} icontype="envelope" iconColor='#6c5ce7' value={email} onChangeText={email => setEmail(email)}/>
                    <InputBox placeholder="Password" type={true} icontype="lock" iconColor='#6c5ce7' value={pass} onChangeText={pass => setPass(pass)}/>
                    <InputBox placeholder="Confirm Password" type={true} icontype="lock" iconColor='#6c5ce7' value={cpass} onChangeText={cpass => setCpass(cpass)}/>
                </View>
                <View style={styles.google}>
                    <SolidButton 
                        title='Sign Up' 
                        icontype='arrow-right' 
                        iconcolor='#ffffff' 
                        buttonColor='#d63031' 
                        register={loading} 
                        onPress={() => {
                            setLoading(true);
                            register(email,pass,cpass);
                            setLoading(false);
                        }}
                    />
                    {/* <SocialIcon     
                        button={true}
                        title='Sign Up With Google'
                        type='google'
                        loading={false}
                        style={{padding: hp('2%'), backgroundColor: '#4285F4'}}
                    />      */}
                </View>
                <View style={styles.bottomContainer}>
                    <Divider orientation='horizontal' subHeader='Already a Member?' width={wp('0.5%')} subHeaderStyle={styles.subHeader}/>
                    <Button title='Sign In' type='clear' buttonStyle={styles.signin} onPress={()=>navigation.navigate('login')}/> 
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
    }
});

export default Register;