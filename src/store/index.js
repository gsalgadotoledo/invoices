import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { invoiceReducer as invoices } from '@/modules/invoices';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      invoices
    }),
    composeEnhancers(applyMiddleware(thunk, createLogger()))
  );

  return store;
};
