import {
  SET_MONKEYS,
  SET_USER,
  SET_USERS
} from './constants';
  
const initialState = {
  users: [],
  userId: 0,
  monkeys: [],
};
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return Object.assign({}, state, {
        users: action.users
      });
      case SET_USER:
        return Object.assign({}, state, {
          userId: action.userId
        });
    case SET_MONKEYS:
        return Object.assign({}, state, {
          monkeys: action.monkeys
        });
    default:
      return state;
  }
};

export default reducer;
    