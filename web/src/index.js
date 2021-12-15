import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reducer from "./store/Reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { SnackbarProvider } from "notistack";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
