import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import api from '../../Utils/api';
import { inject, observer } from 'mobx-react/native';

import Router from 'chemQuizz/src/Router.js';
import { Page, Button } from 'chemQuizz/src/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
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
  }
};

@withNavigation
@inject((allStores) => {
  const currentUserStore = allStores.currentUserStore;
  return {
    currentUser: currentUserStore.currentUser,
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
    api.getCategories()
      .then((categories) => {
        this.props.navigator.push(
          Router.getRoute('categories', {categories})
        );
      }
    )
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
          { !!this.props.currentUser.email &&
            <Text style={styles.welcome}>Vous êtes connecté en tant que {this.props.currentUser.email}</Text>
          }
          { !!this.props.currentUser.id &&
            <Button onPress={this.goToCategories}>Jouer !</Button>
          }
          { !this.props.currentUser.id &&
            <Button onPress={this.goToLogIn}>Connectez vous !</Button>
          }
        </View>
      </Page>
    );
  }
}


export default Home;
