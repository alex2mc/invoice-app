import {
  // GET_PRODUCT_SUCCEEDED,
  GET_PRODUCTS_SUCCEEDED,
} from './actions';


const initialState = {
  entities: {},
  ids: [],
  currentProductId: null
};

export default function customersReducer(state = initialState, action) {

  switch (action.type) {

    case GET_PRODUCTS_SUCCEEDED: {
      const products = action.payload


      const newEntities = products.reduce((acc, product) => {
        return {
          ...acc,
          [product._id]: product
        }
      }, {})

      const newIds = products.reduce((acc, product) => {
        return  [...acc, product._id]
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