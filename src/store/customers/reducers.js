import {
  GET_CUSTOMERS_SUCCEEDED,
} from './actions';

const initialState = {
  entities: {},
  ids: [],
  currentCustomerId: null
};

export default function customersReducer(state = initialState, action) {

  switch (action.type) {

    case GET_CUSTOMERS_SUCCEEDED: {
      const customers = action.payload


      const newEntities = customers.reduce((acc, customer) => {
        return {
          ...acc,
          [customer._id]: customer
        }
      }, {})

      const newIds = customers.reduce((acc, customer) => {
        return  [...acc, customer._id]
      }, [])

      return {
        ...state,
        entities: newEntities,
        ids: newIds,
      };
    }


    default:
      return state;
  }
}