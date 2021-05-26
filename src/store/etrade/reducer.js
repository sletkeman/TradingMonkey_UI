import {
  ETRADE_SESSION
} from './constants';
  
const initialState = {
  authenticated: false,
};
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ETRADE_SESSION:
        return Object.assign({}, state, {
            sessionValid: true
          });
    default:
      return state;
  }
};

export default reducer;
    