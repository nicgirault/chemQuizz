import * as firebase from 'firebase';
import { AppRegistry } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyCRgK6uY3CshbZcKvOisboOU3jfUXFWPX",
  authDomain: "chemquizz-c6ed3.firebaseapp.com",
  databaseURL: "https://chemquizz-c6ed3.firebaseio.com",
  storageBucket: "chemquizz-c6ed3.appspot.com",
  messagingSenderId: "278723540404"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

import App from 'chemQuizz/src/App';

AppRegistry.registerComponent('chemQuizz', () => App);
