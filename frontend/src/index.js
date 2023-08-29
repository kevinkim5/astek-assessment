import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles.scss";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

import { fetchCafes } from "./features/cafes/cafeSlice";

store.dispatch(fetchCafes());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
