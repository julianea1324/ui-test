import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./views/App";
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from "./application/store";
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
