export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCT_SUCCEEDED = 'GET_PRODUCT_SUCCEEDED';
export const GET_PRODUCT_FAIL = 'GET_PRODUCT_FAIL';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCEEDED = 'GET_PRODUCTS_SUCCEEDED';
export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';

export const getProduct = (id) => ({
  type: GET_PRODUCT,
  id: id
});

export const getProductSucceeded = (product) => ({

  type: GET_PRODUCT_SUCCEEDED,
  payload: product
});

export const getProductFail = (error) => ({
  type: GET_PRODUCT_FAIL,
  payload: error
});


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