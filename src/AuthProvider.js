import React, {createContext} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    
    return(
        <AuthContext.Provider
            value = {{
                user,
                setUser,
                login: async(email,password) => {
                    try{
                       await auth().signInWithEmailAndPassword(email, password);
                    }catch(e){
                        console.log(e);
                    }
                },
                register: async(email,password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                          firestore().collection('users').doc(auth().currentUser.uid)
                          .set({
                              fname: '',
                              lname: '',
                              email: email,
                              createdAt: firestore.Timestamp.fromDate(new Date()),
                              userImg: null,
                          })
                          .catch(error => {
                              console.log('Error adding user to firestore: ', error);
                          })
                        })
                        .catch(error => {
                            Alert.alert(
                                'Error!',
                                error.code,
                                [
                                    {
                                        text: 'Retry',
                                        onPress: () => console.log('sign up failed..'),
                                        style: 'cancel'
                                    }
                                ]
                            );
                        });
                      } catch (e) {
                        console.log(e);
                      }
                    },
                logout: async() => {
                    try{
                        await auth.signOut();
                    }catch(e){
                        console.log(e);
                    }
                }
            }}>
            {children}
        </AuthContext.Provider>
    );
}