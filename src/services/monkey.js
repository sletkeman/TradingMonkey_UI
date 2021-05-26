import api from './api';

const fetchUsers = () => api.get('monkey/users');
const fetchMonkeys = (userId) => api.get(`monkey/monkeys?userId=${userId}`);
const fetchPositions = (monkeyId) => api.get(`monkey/positions?monkeyId=${monkeyId}`);

export {
    fetchUsers,
    fetchMonkeys,
    fetchPositions
}