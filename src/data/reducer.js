export const initialState = {
  token: 'hello',
  user: null,
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        user: action.token,
      };

    default:
      return state;
  }
};

export default reducer;
