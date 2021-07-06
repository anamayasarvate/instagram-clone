import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../actions/user';

export default function Main() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  if (currentUser == undefined) {
    return <View></View>;
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>{currentUser.name} is logged in</Text>
    </View>
  );
}
