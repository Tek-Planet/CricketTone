export const initialState = {
  token: '',
  user:{}
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_TOKEN':
      console.log(action.token);
      return {
        ...state,
        token: action.token,
      };
    
      case 'SET_USER':
      console.log(action.user);
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
