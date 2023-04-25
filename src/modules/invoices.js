import { INVOICE_STATE_OPEN } from '@/constants';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3001';

// Constants

export const INVOICE = {
  UPDATE_ALL: 'INVOICE@UPDATE_ALL',
  UPDATE: 'INVOICE@UPDATE',
  LOADING: 'INVOICE@LOADING',
  SUCCESS: 'INVOICE@SUCCESS',
  ERROR: 'INVOICE@ERROR',
  SWIPE: 'INVOICE@SWIPE'
}

// Default values

const defaultState = {
  error: null,
  status: null,
  invoices: [],
  invoice: {
    invoiceName: '',
    invoiceTo:'',
    payTo:'',
    items: [],
    notes: '',
    state: INVOICE_STATE_OPEN,
    duoDate: null,
    createdAt: new Date()
  }
};

// Invoices Reducer

export const invoiceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INVOICE.UPDATE_ALL:
      return {
        ...state,
        invoices: action.payload
      };
    case INVOICE.UPDATE:
      return {
        ...state,
        invoice: action.payload
      };
    case INVOICE.SWIPE:
      return {
        ...state,
        invoice: defaultState.invoice
      };
    case INVOICE.LOADING:
      return {
        ...state,
        status: 'loading'
      };
    case INVOICE.SUCCESS:
      return {
        ...state,
        status: 'success'
      };
      case INVOICE.ERROR:
        return {
          ...state,
          status: 'error'
      };
    default:
      return state;
  }
};


// Action generators

export const loading = () => ({
  type: INVOICE.LOADING
});
export const success = () => ({
  type: INVOICE.SUCCESS
});
export const error = (error) => ({
  type: INVOICE.ERROR,
  payload: error
});
export const updateAll = (invoices) => ({
  type: INVOICE.UPDATE_ALL,
  payload: invoices
});
export const update = (invoice) => ({
  type: INVOICE.UPDATE,
  payload: invoice
});
export const swipeCurrentInvoiceAction = () => ({
  type: INVOICE.SWIPE
});

// Async actions

export const fetchInvoiceAction = () => async (dispatch) => {
  try {
    dispatch(loading());
    const invoicesFetch = await fetch(`${BASE_URL}/invoices`);
    const invoices = await invoicesFetch.json();
    
    setTimeout(() => {
      dispatch(updateAll(invoices));
      dispatch(success());
    }, 900);
    
    return invoices;
  } catch(errorMessage) {
    dispatch(error(errorMessage));
  }
};

export const fetchInvoiceByIdAction = (id) => async (dispatch) => {
  try {
    dispatch(loading());
    const invoiceFetch = await fetch(`${BASE_URL}/invoices/${id}`);
    const invoice = await invoiceFetch.json();
    
    dispatch(success());
    dispatch(update(invoice));
    
    return invoice;
  } catch(errorMessage) {
    dispatch(error(errorMessage));
  }
};

export const fetchCreateInvoiceAction = (newInvoice) => async (dispatch) => {
  try {
    dispatch(loading());
    const invoiceFetch = await fetch(`${BASE_URL}/invoices`, {
      method: 'POST',
      body: JSON.stringify(newInvoice),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const invoice = await invoiceFetch.json();
    
    dispatch(success());
    return invoice;
  } catch(errorMessage) {
    dispatch(error(errorMessage));
  }
};

export const fetchUpdateInvoiceAction = (invoiceToUpdate) => async (dispatch) => {
  try {
    dispatch(loading());
    const invoiceFetch = await fetch(`${BASE_URL}/invoices/${invoiceToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify(invoiceToUpdate),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const invoice = await invoiceFetch.json();
    
    dispatch(success());
    return invoice;
  } catch(errorMessage) {
    dispatch(error(errorMessage));
  }
};

// Selector

export const invoiceSelector = state => state.invoices.invoice;
export const invoiceListSelector = state => state.invoices.invoices;
export const invoiceStatusSelector = state => state.invoices.status;
