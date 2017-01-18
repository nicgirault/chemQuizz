import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import api from '../../Utils/api';

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
  },
});

type PropsType = {
  navigator: any,
  quizz: {
    answers: array,
    correct: string,
    question: string,
  }
};

@withNavigation
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

  props: PropsType;

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Bienvenue sur chemQuizz!
          </Text>
          <Button onPress={this.goToCategories}>Jouer !</Button>
        </View>
      </Page>
    );
  }
}


export default Home;
