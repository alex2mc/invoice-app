import { createSelector } from 'reselect';

// selector
const getProducts = (state) => state.products.products;

// reselect function
export const getProductsState = createSelector(
  [ getProducts ],
  (products) => products
)