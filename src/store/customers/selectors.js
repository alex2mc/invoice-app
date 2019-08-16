import { createSelector } from 'reselect';
// selector
const getCustomers = (state) => state.customers.customers
// reselect function
export const getCustomersState = createSelector(
  [ getCustomers ],
  (customers) => customers
)



//
// import { RootState } from '../index';
//
// import { State } from './state';
//
// export const getOffersState = (state: RootState) => state.offers;
//
// export const getEntities = createSelector(
//   getOffersState,
//   (state: State) => state.entities,
// );
//
// export const getCurrentOffer = createSelector(
//   getOffersState,
//   getEntities,
//   (state: State, entities) => entities[state.currentOfferId!],
// );
//
// export const getOffers = createSelector(
//   getOffersState,
//   getEntities,
//   (state: State, entities) => state.ids.map((id) => entities[id]),
// );
//
// export const getNext = createSelector(
//   getOffersState,
//   (state: State) => state.next,
// );
//
// export const getHasNext = createSelector(
//   getOffersState,
//   (state: State) => state.hasNext,
// );