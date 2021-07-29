/*firebase*/
import firestore from '@react-native-firebase/firestore';

export async function onSend(message, text, uid, name, rid) {
    
    // console.log('sending message to db...')
    // console.log(message.map(a => a.createdAt));
    console.log(text);
    await firestore()
      .collection('messages')
      .doc(rid)
      .update({
        messages: firestore.FieldValue.arrayUnion({
          _id: message.map(a => a._id),
          text: text,
          createdAt: new Date().toUTCString(),
          user: {
            _id: uid,
            name: name,
          },
        }),
      })
      .then(async () => {
        console.log('sent!');
        
        await firestore()
          .collection('rooms')
          .doc(rid)
          .update({
            recent: {
              message: text,
              sentBy: name,
            },
            sentAt: message.map(a => a.createdAt),
          })
          .catch(e => console.log(e));
      })
      .catch(e => {
        console.log(e);
      });
  }