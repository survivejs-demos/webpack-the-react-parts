import React from "react";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
import App from "./App.jsx";
import DevTools from "./DevTools.jsx";

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
);

export default hot(module)(Root);
