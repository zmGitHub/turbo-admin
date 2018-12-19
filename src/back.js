import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import basicReducer from './containers/reducer';

const MOUNT_NODE = document.getElementById('root');

const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
});

// 开发模式下开启 redux-tool 工具
const middlewares = __DEV__ ? compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
) : applyMiddleware(thunk);

// 将 state 和应用程序相关联
const store = createStore(
  basicReducer,
  middlewares
);

let render = () => {
  const routes = require('./routes/index').default();

  ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
    </Provider>,
    MOUNT_NODE
  );
};


if (__DEV__ && module.hot) {
  // 开发模式下的渲染
  const renderApp = render;

  const renderError = (error) => {
    const RedBox = require('redbox-react').default();

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
  };

  // 渲染页面
  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };

  // 开启组件热部署
  module.hot.accept('./routes/index', () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  });
  // 开启对 reducer 的热部署
  module.hot.accept('./containers/reducer', () => {
    store.replaceReducer(require('./containers/reducer').default);
  });
}
// ========================================================
// 渲染页面
// ========================================================
render();
