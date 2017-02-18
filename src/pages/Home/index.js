import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import api from '../../Utils/api';
import { inject, observer } from 'mobx-react/native';

import Router from 'chemQuizz/src/Router.js';
import { Page, Button } from 'chemQuizz/src/components';
import appStyle from 'chemQuizz/src/appStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  disconnect: {
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: appStyle.colors.lightText,
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

type PropsType = {
  navigator: any,
  currentUser: {
    id: string,
    email: string,
  },
  quizz: {
    answers: array,
    correct: string,
    question: string,
  },
  logOut: any,
};

@withNavigation
@inject((allStores) => {
  const currentUserStore = allStores.currentUserStore;
  return {
    currentUser: currentUserStore.currentUser,
    logOut: () => currentUserStore.logOut(),
  };
})
@observer
class Home extends Component {
  static route = {
    navigationBar: {
      title: 'chemQuizz',
    },
  }

  goToCategories = () => {
    if(!this.props.currentUser.id) {
      this.goToLogIn();
    } else {
      api.getCategories()
        .then((categories) => {
          this.props.navigator.push(
            Router.getRoute('categories', {categories})
          );
        }
      )
    }
  }

  goToLogIn = () => {
    this.props.navigator.push(
      Router.getRoute('login')
    );
  }

  props: PropsType;

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Text style={[styles.welcome, {color: '#DF1A25'}]}>B</Text>
            <Text style={[styles.welcome, {color: '#47FAD1'}]}>I</Text>
            <Text style={[styles.welcome, {color: '#FAD147'}]}>E</Text>
            <Text style={[styles.welcome, {color: '#DF1A25'}]}>N</Text>
            <Text style={[styles.welcome, {color: '#47FAD1'}]}>V</Text>
            <Text style={[styles.welcome, {color: '#FAD147'}]}>E</Text>
            <Text style={[styles.welcome, {color: '#DF1A25'}]}>N</Text>
            <Text style={[styles.welcome, {color: '#47FAD1'}]}>U</Text>
            <Text style={[styles.welcome, {color: '#FAD147'}]}>E</Text>
          </View>
          <Button onPress={this.goToCategories}>Jouer !</Button>
          { !!this.props.currentUser.email &&
            <View>
              <Text style={styles.disconnect}>Vous êtes connecté en tant que {this.props.currentUser.email}</Text>
              <Button onPress={() => this.props.logOut()} type='outline'>Se déconnecter</Button>
            </View>
          }
        </View>
      </Page>
    );
  }
}


export default Home;
