import api from './api';
import qs from 'qs';

const getAuthUrl = () => api.get('etrade/auth');
const postSession = (code) =>
    api.post(`etrade/session?${qs.stringify({ code })}`)


export {
    getAuthUrl,
    postSession
}