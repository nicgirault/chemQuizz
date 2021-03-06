import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback} from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import firebase from 'firebase';
import { observe } from 'mobx';

import Router from 'chemQuizz/src/Router.js';
import { Page, Button } from 'chemQuizz/src/components';
import appStyle from 'chemQuizz/src/appStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 0,
    alignSelf: 'stretch',
  },
  textInput: {
    marginVertical: 5,
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 4,
  },
  errorMessage: {
    textAlign: 'center',
    color: appStyle.colors.errorMessage,
  },
  button: {
    marginVertical: 10,
  }
});

type PropsType = {
  navigator: any,
  currentUser: any,
  logUser: () => void,
};

@withNavigation
@inject((allStores) => {
  const currentUserStore = allStores.currentUserStore;
  return {
    currentUser: currentUserStore.currentUser,
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
      signUpError: '',
      isLoading: false,
    };

    observe(props.currentUser, 'id', (change) => {
      api.getCategories().then((categories) => {
        this.setState({isLoading: false});
        this.props.navigator.immediatelyResetStack([
          Router.getRoute('home'),
          Router.getRoute('categories', {categories}),
        ]);
      })
    });
  }

  signUp = () => {
    this.setState({isLoading: true});
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.logIn())
    .catch(e => {
      let message = '';
      switch (e.code) {
        case 'auth/invalid-email':
          message = 'Veuillez entrer une adresse email bien formatée !';
          break;
        case 'auth/weak-password':
          message = 'Votre mot de passe doit faire au moins 6 charactères !';
          break;
        default:
          message = 'Une erreur inconnue est survenue, vérifiez vos informations';
      }
      this.setState({isLoading: false, signUpError: message});
    })
  }

  logIn = () => {
    this.props.logUser({
      email: this.state.email,
      password: this.state.password,
    });
  }

  props: PropsType;

  render() {
    return (
      <Page noNavBar>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
            { this.state.signUpError !== '' &&
              <Text style={styles.errorMessage}>
                {this.state.signUpError}
              </Text>
            }
              <TextInput
                style={styles.textInput}
                autoFocus
                keyboardType='email-address'
                placeholder='Adresse Email'
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
              <TextInput
                secureTextEntry
                style={styles.textInput}
                placeholder='Mot de passe'
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </View>
            <Button
              style={styles.button}
              onPress={this.signUp}
              isLoading={this.state.isLoading}
              isDisabled={this.state.isLoading}
            >
              Créez votre compte !
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </Page>
    );
  }
}


export default SignUp;
