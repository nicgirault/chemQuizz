import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import firebase from 'firebase';

import Router from 'chemQuizz/src/Router.js';
import { Page, Button } from 'chemQuizz/src/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

type PropsType = {
  navigator: any,
  logUser: () => void,
};

@withNavigation
@inject((allStores) => {
  const currentUserStore = allStores.currentUserStore;
  return {
    logUser: accountData => currentUserStore.logUser(accountData),
  };
})
class SignUp extends Component {
  static route = {
    navigationBar: {
      title: 'Créez votre compte !',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  signUp = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.logIn())
    .catch(e => console.log(e.message))
  }

  logIn = () => {
    this.props.logUser({
      email: this.state.email,
      password: this.state.password,
    });
    this.props.navigator.pop(2);
  }

  props: PropsType;

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <TextInput
            style={{height: 40, borderColor: 'lightgray', borderWidth: 1, padding: 4}}
            autoFocus
            keyboardType='email-address'
            placeholder='Email address'
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <TextInput
            style={{height: 40, borderColor: 'lightgray', borderWidth: 1, padding: 4}}
            placeholder='Password'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <Button onPress={this.signUp}>Créez votre compte !</Button>
        </View>
      </Page>
    );
  }
}


export default SignUp;
