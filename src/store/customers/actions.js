export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const GET_CUSTOMERS_SUCCEEDED = 'GET_CUSTOMERS_SUCCEEDED';
export const GET_CUSTOMERS_FAIL = 'GET_CUSTOMERS_FAIL';
export const GET_CURRENT_CUSTOMER = 'GET_CURRENT_CUSTOMER';
export const GET_CURRENT_CUSTOMER_SUCCEEDED = 'GET_CURRENT_CUSTOMER_SUCCEEDED';
export const GET_CURRENT_CUSTOMER_FAIL = 'GET_CURRENT_CUSTOMER_FAIL';

export const getCustomers = () => ({
  type: GET_CUSTOMERS,
});

export const getCustomersSucceeded = (customers) => ({
  type: GET_CUSTOMERS_SUCCEEDED,
  payload: customers
});

export const getCustomersFail = (error) => ({
  type: GET_CUSTOMERS_FAIL,
  payload: error
});

export const getCurrentCustomer = (payload) => ({
  type: GET_CURRENT_CUSTOMER,
  payload: payload
});

export const getCurrentCustomerSucceeded = (customers) => ({
  type: GET_CURRENT_CUSTOMER_SUCCEEDED,
  payload: customers
});

export const getCurrentCustomerFail = (error) => ({
  type: GET_CURRENT_CUSTOMER_FAIL,
  payload: error
});