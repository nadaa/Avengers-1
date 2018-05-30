import React, {Component} from 'react';
import {StyleSheet, View, Text, KeyboardAvoidingView} from 'react-native';
import SignUpForm from './SignUpForm';

export default class SignUp extends Component {

  render(){
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <SignUpForm/>
      </KeyboardAvoidingView>

      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#2980b9',
    justifyContent : 'center',
    paddingLeft : 60,
    paddingRight: 60,
  },

})