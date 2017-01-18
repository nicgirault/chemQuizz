import React from 'react';
import { Provider } from 'mobx-react/native';

import QuizzStore from './Utils/quizzStore.js';
import Scenes from './Scenes';

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  const xhr = global.originalXMLHttpRequest ?
  global.originalXMLHttpRequest :
  global.XMLHttpRequest;
  global.XMLHttpRequest = xhr;
}

const quizzStore = new QuizzStore();

const App = () => (
  <Provider
    quizzStore={quizzStore}
  >
    <Scenes />
  </Provider>
);

export default App;
