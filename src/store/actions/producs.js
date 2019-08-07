export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchWhiskies = () => ({
  type: FETCH_PRODUCTS,
});

export const fetchWhiskiesSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

export const fetchWhiskiesFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error
});