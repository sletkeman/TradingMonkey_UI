import api from './api';

const fetchUsers = () => api.get('monkey/users');
const fetchMonkeys = (userId) => api.get(`monkey/monkeys?userId=${userId}`)

export {
    fetchUsers,
    fetchMonkeys
}