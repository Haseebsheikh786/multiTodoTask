import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./store/index";
import thunk from "redux-thunk";

import { applyMiddleware, createStore } from "redux";
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <>
        <Provider store={store}>
            <App />
        </Provider>
    </>,
    document.getElementById("root")
);
