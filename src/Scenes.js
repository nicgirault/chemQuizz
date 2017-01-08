import React, { Component } from 'react';
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import { ListView } from 'react-native';
import * as firebase from 'firebase';

import Router from 'chemQuizz/src/Router.js';

const firebaseConfig = {
  apiKey: "AIzaSyCRgK6uY3CshbZcKvOisboOU3jfUXFWPX",
  authDomain: "chemquizz-c6ed3.firebaseapp.com",
  databaseURL: "https://chemquizz-c6ed3.firebaseio.com",
  storageBucket: "chemquizz-c6ed3.appspot.com",
  messagingSenderId: "278723540404"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class Scenes extends Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')} />
      </NavigationProvider>
    );
  }
}

export default Scenes;
