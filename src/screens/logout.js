/* firebase */
import auth from '@react-native-firebase/auth';

const Logout = () => {

  auth()
  .signOut()
  .then(() => {
    console.log('logged out');
  })
  .catch(e => {
    console.log(e);
  });

  return (
    null
  );
};

export default Logout;
