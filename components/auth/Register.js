import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useState } from 'react';
import firebase from 'firebase';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { name, email, password } = formData;

  const onSignUp = async () => {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <TextInput
        placeholder='name'
        onChangeText={(nameInput) =>
          setFormData({ ...formData, name: nameInput })
        }
      />
      <TextInput
        placeholder='email'
        onChangeText={(emailInput) =>
          setFormData({ ...formData, email: emailInput })
        }
      />
      <TextInput
        placeholder='password'
        secureTextEntry={true}
        onChangeText={(passwordInput) =>
          setFormData({ ...formData, password: passwordInput })
        }
      />
      <Button onPress={() => onSignUp()} title='Sign Up' />
    </View>
  );
}
