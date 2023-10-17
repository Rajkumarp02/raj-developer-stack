import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import Reducers from './components/Redux/store'







const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(Reducers,compose(applyMiddleware(thunk)))


root.render(

  <Provider store={store}>
  <React.StrictMode>
   
  <div id ="google_translate_element">
  <App />
  </div>
   </React.StrictMode>
   </Provider>
);

