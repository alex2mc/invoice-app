export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS';
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS';
export const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMERS_FAILURE';

export const fetchCustomers = () => ({
  type: FETCH_CUSTOMERS,
});

export const fetchCustomersSuccess = (customers) => ({
  type: FETCH_CUSTOMERS_SUCCESS,
  payload: customers
});

export const fetchCustomersFailure = (error) => ({
  type: FETCH_CUSTOMERS_FAILURE,
  payload: error
});