import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
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
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 4
  },
  errorMessage: {
    color: appStyle.colors.errorMessage
  },
});

type PropsType = {
  navigator: any,
  logUser: () => void,
  currentUser: any,
  logError: any,
};

@withNavigation
@inject((allStores) => {
  const currentUserStore = allStores.currentUserStore;
  return {
    logUser: accountData => currentUserStore.logUser(accountData),
    currentUser: currentUserStore.currentUser,
    logError: currentUserStore.logError,
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
    };

    observe(props.currentUser, 'id', (change) => {
      api.getCategories()
        .then(categories => this.props.navigator.replace(Router.getRoute('categories', {categories})))
    });
  }

  logIn = () => {
    this.props.logUser({
      email: this.state.email,
      password: this.state.password,
    });
  }

  goToSignUp = () => {
    this.props.navigator.push(
      Router.getRoute('signup')
    );
  }

  props: PropsType;

  render() {
    return (
      <Page>
        <View style={styles.container}>
          { this.props.logError && <Text style={styles.errorMessage}>Combinaison email - mot de passe incorrecte</Text>}
          <TextInput
            style={styles.textInput}
            autoFocus
            keyboardType='email-address'
            placeholder='Email address'
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <TextInput
            style={styles.textInput}
            placeholder='Password'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <Button onPress={this.logIn}>Connexion !</Button>
          <Separator text="ou" />
          <Button onPress={this.goToSignUp} type="outline">S&apos;incrire</Button>
        </View>
      </Page>
    );
  }
}

export default LogIn;
