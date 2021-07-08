import firebase from 'firebase';
import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
} from '../constants/index';

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

export function fetchUserPosts() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: USER_POSTS_STATE_CHANGE, payload: { posts } });
      });
  };
}

export function fetchUserFollowing() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, payload: { following } });
        // for (let i = 0; i < following.length; i++) {
        //   dispatch(fetchUsersData(following[i], true));
        // }
      });
  };
}
