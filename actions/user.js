import firebase from 'firebase';
import { USER_STATE_CHANGE } from '../constants/index';

export const fetchUser = () => async (dispatch) => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection('user')
      .doc(firebase.auth().currentUser.uid)
      .get();
    if (snapshot.exists) {
      dispatch({
        type: USER_STATE_CHANGE,
        payload: { currentUser: snapshot.data() },
      });
    } else {
      console.log('does not exist');
    }
  } catch (error) {
    console.log(error);
  }
};
