import {
  SET_MONKEYS,
  SET_MONKEY,
  SET_USER,
  SET_USERS,
  SET_POSITIONS
} from './constants';
  
const initialState = {
  users: [],
  userId: 0,
  monkeys: [],
  monkeyId: 0,
  positions: []
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
      case SET_MONKEY:
        return Object.assign({}, state, {
          monkey: action.monkey
        });
      case SET_POSITIONS:
        return Object.assign({}, state, {
          positions: action.positions
        });
    default:
      return state;
  }
};

export default reducer;
    