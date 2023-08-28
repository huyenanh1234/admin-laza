import React from "react";
import ReactDOM from "react-dom/client";
import {
    RouterProvider,
} from "react-router-dom";
import "./assets/scss/index.scss";
import router from './routes/router'
import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
  </Provider>
)
