import {
  ETRADE_SESSION,
  ETRADE_SET_ACCOUNTS,
  ETRADE_SET_ACCOUNT,
  ETRADE_SET_PORTFOLIO
} from './constants';
  
const initialState = {
  authenticated: false,
  accounts: [],
  accountIdKey: '',
  portfolio: {}
};
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ETRADE_SESSION:
      return Object.assign({}, state, {
        sessionValid: action.authenticated
      });
    case ETRADE_SET_ACCOUNTS:
      return Object.assign({}, state, {
        accounts: action.accounts
      });
    case ETRADE_SET_ACCOUNT:
      return Object.assign({}, state, {
        accountIdKey: action.accountIdKey
      });
    case ETRADE_SET_PORTFOLIO:
      return Object.assign({}, state, {
        portfolio: action.portfolio
      });
    default:
      return state;
  }
};

export default reducer;
    