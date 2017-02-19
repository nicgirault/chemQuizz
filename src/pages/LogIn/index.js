import React, { Component } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { observe } from 'mobx';

import { withNavigation } from '@exponent/ex-navigation';

import api from '../../Utils/api';
import Router from 'chemQuizz/src/Router.js';
import { Page, Button, Separator } from 'chemQuizz/src/components';

import appStyle from 'chemQuizz/src/appStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
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
    padding: 4
  },
  errorMessage: {
    textAlign: 'center',
    color: appStyle.colors.errorMessage,
  },
  button: {
    marginHorizontal: 10,
  },
});

type PropsType = {
  navigator: any,
  logUser: () => void,
  currentUser: any,
  ErrorMessages: any,
  clearErrorMessages: () => void,
};

@withNavigation
@inject((allStores) => {
  const currentUserStore = allStores.currentUserStore;
  return {
    logUser: accountData => currentUserStore.logUser(accountData),
    clearErrorMessages: () => currentUserStore.clearErrorMessages(),
    currentUser: currentUserStore.currentUser,
    ErrorMessages: currentUserStore.ErrorMessages,
  };
})
@observer
class LogIn extends Component {
  static route = {
    navigationBar: {
      title: 'Connectez vous !',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };

    observe(props.currentUser, 'id', (change) => {
      api.getCategories()
        .then((categories) => {
          this.setState({isLoading: false});
          this.props.navigator.replace(Router.getRoute('categories', {categories}))
        })
    });

    observe(props.ErrorMessages, 'logError', change => this.setState({isLoading: false}));
  }

  logIn = () => {
    Keyboard.dismiss();
    this.setState({isLoading: true});
    this.props.logUser({
      email: this.state.email,
      password: this.state.password,
    });
  }

  goToSignUp = () => {
    Keyboard.dismiss();
    this.props.navigator.push(
      Router.getRoute('signup')
    );
  }

  props: PropsType;

  render() {
    return (
      <Page noNavBar>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            { this.props.ErrorMessages.logError &&
              <Text style={styles.errorMessage}>
                Combinaison email - mot de passe incorrecte
              </Text>
            }
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                onFocus={() => this.props.clearErrorMessages()}
                keyboardType='email-address'
                placeholder='Adresse Email'
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
              <TextInput
                style={styles.textInput}
                onFocus={() => this.props.clearErrorMessages()}
                placeholder='Mot de passe'
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </View>
            <Button
              style={styles.button}
              onPress={this.logIn}
              type='standard'
              isLoading={this.state.isLoading}
              isDisabled={this.state.isLoading}
            >Connexion !</Button>
            <Separator text="ou" />
            <Button
              style={styles.button}
              onPress={this.goToSignUp}
              type="outline"
            >
              S&apos;incrire
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </Page>
    );
  }
}

export default LogIn;
