import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import history from './utils/history';
import configureStore from './configureStore';

import AuthProvider from './containers/AuthProvider';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <AuthProvider>
          <App />
        </AuthProvider>
      </>
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
