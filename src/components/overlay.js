/* React & React native */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/* Firebase */
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

/* Components */
import InputBox from './inputbox';
import ModalButton from './modalButton';

const QuickOverlay = ({visible, toggleOverlay, placeholder, buttonTitle}) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function Room(input) {
    setLoading(true);
    if (buttonTitle == 'Create') {
      await firestore()
        .collection('rooms')
        .add({
          name: input,
          members: [auth().currentUser.uid],
          recent: {
            message: '',
            sentBy: '',
            sentAt: '',
          },
          unread: "0",
          rid: "",
        })
        .then(async docRef => {
          await firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .update({
              room: firestore.FieldValue.arrayUnion(docRef.id),
            })
            .then(
              firestore()
              .collection('rooms')
              .doc(docRef.id)
              .update({
                rid: docRef.id,
              })
            )
            .catch(e => console.log(e));
        })
        .then(() => {
          setLoading(false);
          setInput('');
          console.log('succ');
        })
        .catch(e => console.log(e));
    }else{
      await firestore()
        .collection('rooms')
        .doc(input)
        .update({
          members: firestore.FieldValue.arrayUnion(auth().currentUser.uid),
        })
        .then(async () => {
          await firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .update({
              room: firestore.FieldValue.arrayUnion(input),
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }
  }

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.overlay}>
      <InputBox
        placeholder={placeholder}
        type={false}
        icontype="edit"
        iconColor="#6c5ce7"
        value={input}
        onChangeText={input => setInput(input)}
      />
      <View style={styles.buttonBox}>
        <ModalButton
          title={buttonTitle}
          icontype="plus"
          iconcolor="#ffffff"
          buttonColor="#6c5ce7"
          loading={loading}
          onPress={() => Room(input)}
        />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    height: hp('30%'),
    width: wp('90%'),
  },
  buttonBox: {
    width: wp('80%'),
    alignItems: 'center',
    marginVertical: hp('2%'),
    marginHorizontal: wp('2%'),
  },
});
export default QuickOverlay;
