import { createSelector } from 'reselect';

import { RootState } from '../index';



export const getProductsState = (state = RootState) => state.products;


export const getEntities = createSelector(
  getProductsState,
  (state ) => state.entities,
);


export const getProductsArray = createSelector(
  getProductsState,
  getEntities,
  (state , entities) => state.ids.map((id) => entities[id]),
)