import { action, computed, observable, extendObservable } from 'mobx';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

export default class CurrentUserStore {
  constructor() {
    AsyncStorage.getItem(this.USERID_STORAGE_KEY, (error, uid) => {
      this.currentUser.id = uid;
      AsyncStorage.getItem(this.USEREMAIL_STORAGE_KEY, (error, email) => {
        this.currentUser.email = email;
      });
    });
  }

  USERID_STORAGE_KEY = 'USERID';
  USEREMAIL_STORAGE_KEY = 'USEREMAIL';

  @observable currentUser = this.getEmptyUser();
  @observable ErrorMessages = {logError: null};

  getEmptyUser() {
    return {
      id: null,
      email: null,
    };
  }

  @action logUser(accountData) {
    firebase.auth().signInWithEmailAndPassword(accountData.email, accountData.password)
    .then((loggedUser) => {
      AsyncStorage.setItem(this.USERID_STORAGE_KEY, loggedUser.uid);
      AsyncStorage.setItem(this.USEREMAIL_STORAGE_KEY, loggedUser.email);
      extendObservable(this.currentUser, {
        id: loggedUser.uid,
        email: loggedUser.email,
      });
    })
    .catch(error => extendObservable(this.ErrorMessages, {logError: error}))
  }

  @action logOut() {
    AsyncStorage.removeItem(this.USERID_STORAGE_KEY);
    AsyncStorage.removeItem(this.USEREMAIL_STORAGE_KEY);
    this.currentUser = this.getEmptyUser();
  }

  @action clearErrorMessages() {
    this.ErrorMessages = {logError: null};
  }
}
