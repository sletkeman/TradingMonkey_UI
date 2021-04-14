import api from './api';

const fetchUsers = () => api.get('monkey/users');
const fetchMonkeys = (userId) => api.post(`monkey/monkey?user=${userId}`)

export {
    fetchUsers,
    fetchMonkeys
}