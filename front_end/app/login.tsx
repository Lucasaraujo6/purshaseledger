// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import { firebase } from '@/config/firebaseConfig';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignInType, GoogleUser } from 'expo-google-sign-in';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    initAsync();
  }, []);

  const initAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId: Platform.OS === 'android' ? 'SUA_CLIENT_ID_ANDROID' : 'SUA_CLIENT_ID_IOS',
    });
  };

  const signInWithGoogleAsync = async (): Promise<void> => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user }: { type: GoogleSignInType; user: GoogleUser | null } = await GoogleSignIn.signInAsync();
      if (type === 'success' && user) {
        onSignIn(user);
      }
    } catch (error: any) {
      alert('login: Error:' + error.message);
    }
  };
  
  const onSignIn = (googleUser: GoogleUserType): void => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser: FirebaseAuthTypes.User | null) => {
      unsubscribe();
      if (!isUserEqual(googleUser, firebaseUser)) {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.auth.idToken,
          googleUser.auth.accessToken
        );
        firebase.auth().signInWithCredential(credential).catch((error) => {
          console.log(error);
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  };
  
  const isUserEqual = (googleUser: GoogleUserType, firebaseUser: FirebaseAuthTypes.User | null): boolean => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={() => { /* lógica de login */ }} />
      <Button title="Login com Google" onPress={signInWithGoogleAsync} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
