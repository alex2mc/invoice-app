

const initialState = {
  products: [],
  isLoading: false,
  error: false
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}