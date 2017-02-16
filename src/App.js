import React from 'react';
import { Provider } from 'mobx-react/native';

import QuizzStore from './Utils/quizzStore.js';
import CurrentUserStore from './Utils/currentUserStore.js';
import Scenes from './Scenes';

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  const xhr = global.originalXMLHttpRequest ?
  global.originalXMLHttpRequest :
  global.XMLHttpRequest;
  global.XMLHttpRequest = xhr;
}

const currentUserStore = new CurrentUserStore();
const quizzStore = new QuizzStore();

const App = () => (
  <Provider
    currentUserStore={currentUserStore}
    quizzStore={quizzStore}
  >
    <Scenes />
  </Provider>
);

export default App;
