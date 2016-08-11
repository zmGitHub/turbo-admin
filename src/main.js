import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import basicReducer from './containers/reducer';

const MOUNT_NODE = document.getElementById('root');
const createAppHistory = useRouterHistory(createBrowserHistory);

const appHistory = createAppHistory();

// 将 state 和应用程序相关联
const store = createStore(
  basicReducer,
  applyMiddleware(thunk)
);

let render = () => {
  const routes = require('./routes/index').default();

  ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes} history={appHistory} />
    </Provider>,
    MOUNT_NODE
  );
};


if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      });
    });
  }
}
// ========================================================
// 渲染页面
// ========================================================
render();
