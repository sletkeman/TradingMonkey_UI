import { fetchUsers, fetchMonkeys, fetchPositions } from '../../services/monkey';

import {
    SET_USERS,
    SET_USER,
    SET_MONKEYS,
    SET_MONKEY,
    SET_POSITIONS
} from './constants';

const setUsers = (users) => ({
    type: SET_USERS,
    users
});

const setUser = (userId) => ({
    type: SET_USER,
    userId
});

const setMonkeys = (monkeys) => ({
    type: SET_MONKEYS,
    monkeys
})

const setMonkey = (monkeyId) => ({
    type: SET_MONKEY,
    monkey: monkeyId
})

const setPositions = (positions) => ({
    type: SET_POSITIONS,
    positions
})

const getUsers = () => async dispatch => {
    try {
        const { data } = await fetchUsers();
        dispatch(setUsers(data));
    } catch (error) {
        console.log(error);
    }
}

const getMonkeys = (userId) => async dispatch => {
    try {
        dispatch(setUser(userId));
        const { data } = await fetchMonkeys(userId);
        dispatch(setMonkeys(data));
    } catch (error) {
        console.log(error);
    }
}

const getPositions = (monkeyId) => async dispatch => {
    try {
        dispatch(setMonkey(monkeyId));
        const { data } = await fetchPositions(monkeyId);
        dispatch(setPositions(data));
    } catch (error) {
        console.log(error);
    }
}

export {
    getUsers,
    getMonkeys,
    getPositions
}