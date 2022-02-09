import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
const initialState = { isLoggedIn: false, uid: {}, Posts: [], searchData: [] };
function reducer(state = initialState, actions) {
  switch (actions.type) {
    case 'AddPost': return { ...state, Posts: actions.payload };
    case 'SETUID': return { ...state, uid: actions.payload };
    case 'ISLOGGEDIN': return { ...state, isLoggedIn: true };
    case 'ISLOGGEDOUT': return { ...state, isLoggedIn: false };
    case "SEARCHDATA": return { ...state, searchData: actions.payload };
    default: return state;
  }
}
const store = createStore(reducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
