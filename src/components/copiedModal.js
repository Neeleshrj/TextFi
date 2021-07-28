import React from 'react';
import { Text, Overlay } from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const CopiedModal = ({visible, text}) => {
  return (
    <Overlay isVisible={visible} overlayStyle={{marginTop: hp('65%')}}>
      <Text >{text}</Text>
    </Overlay>
  );
};

export default CopiedModal;
