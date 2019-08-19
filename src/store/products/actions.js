export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCEEDED = 'GET_PRODUCTS_SUCCEEDED';
export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';

export const getProducts = () => ({
  type: GET_PRODUCTS,
});

export const getProductsSucceeded = (products) => ({

  type: GET_PRODUCTS_SUCCEEDED,
  payload: products
});

export const getProductsFail = (error) => ({
  type: GET_PRODUCTS_FAIL,
  payload: error
});