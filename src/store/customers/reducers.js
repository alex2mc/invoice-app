import {
  GET_CUSTOMERS_SUCCEEDED,
} from './actions';

const initialState = {
  customers: [],
  // customers: {
  //   entities: {[id]: customer},
  //   ids: [id, id],
  //   currentId: id
  // }
};

export default function customersReducer(state = initialState, action) {

  switch (action.type) {

    case GET_CUSTOMERS_SUCCEEDED: {
      const customers = action.payload

      const aaaa = customers.reduce((acc, customer) => {
          return {
            ...acc,
            ids: [...acc.ids, customer._id],
            entities: {
              ...acc.entities,
              [customer._id]: customer
            }
          }
          // acc.ids.push(customer._id);
          // acc.entities[customer._id] = customer
        // ({...acc, ...{[`${customer._id}`]: customer}})

            }, {entities: {}, ids: []})

      console.log(aaaa)
      return {
        ...state,
          customers: action.payload
      };
    }


    default:
      return state;
  }
}