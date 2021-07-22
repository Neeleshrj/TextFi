export const getRoomList = (data) => {
    return {
        type: 'GET_LIST',
        payload: data
    }
}


// export const getRoomList = () => {
//     return async function(dispatch){
//         const data = [];
//         console.log('getting chat list...');
//             await firestore()
//             .collection('rooms')
//             .where('members','array-contains-any',[auth().currentUser.uid])
//             .get()
//             .then(res => {
//                 res.forEach((doc) => {
//                     data.push(doc.data());
//                 })
//             })
//             .then(dispatch({
//                 type: 'GET_LIST',
//                 payload: data
//             }))
//             .catch(e => console.log(e));
//     };
// };