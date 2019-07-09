import React from 'react';
import ReactDOM from 'react-dom';
import { Welcome } from './welcome';
import { App } from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './reducers';
import * as serviceWorker from './serviceWorker';
import axios from './axios';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let element;

function render(element) {
    ReactDOM.render(element, document.getElementById('root'));
}

(async () => {
        try {
            let { data }  = await axios.get("/api/checkLoggedIn");
            if (data === "user_unknown") {
                element = <Welcome />;
                render(element);
            } else if (data === "user_known") {
                element = (
                    <Provider store = { store }>
                        <App />
                    </Provider>
                );
                render(element);
            }
        } catch(err) {
            console.log("err", err);
        }
    })();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
