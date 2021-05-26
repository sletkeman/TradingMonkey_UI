import api from './api';
import qs from 'qs';

const getAuthUrl = () => api.get('etrade/auth');
const getSession = () => api.get('etrade/session');
const postSession = (code) =>
    api.post(`etrade/session?${qs.stringify({ code })}`)
const fetchAccounts = () => api.get('etrade/accounts');
const fetchPortfolio = (accountKey) => api.get(`etrade/portfolio?account_key=${accountKey}`)

export {
    getAuthUrl,
    getSession,
    postSession,
    fetchAccounts,
    fetchPortfolio
}