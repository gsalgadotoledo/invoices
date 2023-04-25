import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import configureStore from './store';
import './scss/main.scss';

const store = configureStore();

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
