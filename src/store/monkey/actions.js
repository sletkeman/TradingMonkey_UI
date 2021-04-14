import { fetchUsers, fetchMonkeys } from '../../services/monkey';

import {
    SET_USERS,
    SET_USER,
    SET_MONKEYS
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

const getUsers = () => async dispatch => {
    try {
        const response = await fetchUsers();
        const { users } = response;
        dispatch(setUsers(users));
    } catch (error) {
        console.log(error);
    }
}

const getMonkeys = (userId) => async dispatch => {
    try {
        dispatch(setUser(userId));
        const response = await fetchMonkeys(userId);
        const { monkeys } = response;
        dispatch(setMonkeys(monkeys));
    } catch (error) {
        console.log(error);
    }
}

export {
    getUsers,
    getMonkeys
}