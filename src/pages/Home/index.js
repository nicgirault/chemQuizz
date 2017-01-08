import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

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
};

@withNavigation
class Home extends Component {
  static route = {
    navigationBar: {
      title: 'chemQuizz',
    },
  }

  _goToCategories = () => {
    this.props.navigator.push(Router.getRoute('categories'));
  }

  props: PropsType;

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Bienvenue sur chemQuizz!
          </Text>
          <Button onPress={this._goToCategories}>Jouer !</Button>
        </View>
      </Page>
    );
  }
}


export default Home;
