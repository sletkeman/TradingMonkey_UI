import {
  ETRADE_AUTH,
  ETRADE_SESSION
} from './constants';
  
const initialState = {
  authUrl: '',
  authenticated: false,
};
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ETRADE_AUTH:
      return Object.assign({}, state, {
        authUrl: action.authUrl
      });
    case ETRADE_SESSION:
        return Object.assign({}, state, {
            sessionValid: true
          });
    default:
      return state;
  }
};

export default reducer;
    