import { createSelector } from 'reselect';
// selector
const getCustomers = (state) => state.customers.customers
// reselect function
export const getCustomersState = createSelector(
  [ getCustomers ],
  (customers) => customers
)