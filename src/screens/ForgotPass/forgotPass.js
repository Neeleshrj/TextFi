/* React */
import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, ScrollView, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'react-native-elements';

/* component */
import InputBox from '../../components/inputbox';
import SolidButton from '../../components/button';
import TempModal from '../../components/tempModal';

/*Firebase */
import auth from '@react-native-firebase/auth';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.input}>
        <Text h3 h3Style={styles.forgotPassText}>
          Forgot Password?
        </Text>
        <InputBox
          placeholder="Your account email"
          type={false}
          icontype="envelope"
          iconColor="#6c5ce7"
          value={email}
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View style={styles.google}>
        <SolidButton
          title="Send Email "
          icontype="arrow-right"
          iconcolor="#d63031"
          buttonColor="#ffffff"
          loading={loading}
          onPress={() => {
            setLoading(true);
            auth().sendPasswordResetEmail(email)
            .then(() => console.log('Email sent succ...'))
            .catch(e => {
              console.log(e);
              Alert.alert(
                'Error!',
                e.code,
                {
                  text: 'Ok',
                  onPress: () => console.log('error logged...'),
                }
              )
            })
            setModalVisible(true);
            setTimeout(() => {
              setModalVisible(false);
            }, 500);
            setEmail("");
            setLoading(false);
          }}
        />
      </View>
      <TempModal visible={modalVisible} text="Email Sent!" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: hp('25%'),
  },
  input: {
    marginHorizontal: wp('4%'),
    marginTop: hp('4%'),
  },
  forgotPassText: {
    marginBottom: hp('2%'),
    fontWeight: 'normal',
  },
  google: {
    //marginHorizontal: wp('10%'),
  },
});

export default ForgotPass;
