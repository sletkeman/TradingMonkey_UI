import { getAuthUrl, getSession, postSession, fetchAccounts, fetchPortfolio } from '../../services/etrade';
import history from '../../services/history';

import {
    ETRADE_SESSION,
    ETRADE_SET_ACCOUNTS,
    ETRADE_SET_PORTFOLIO,
    ETRADE_SET_ACCOUNT
} from './constants';

const setSessionAction = (authenticated) => ({
    type: ETRADE_SESSION,
    authenticated
})

const setAccounts = (accounts) => ({
    type: ETRADE_SET_ACCOUNTS,
    accounts
})

const setAccount = (accountIdKey) => ({
    type: ETRADE_SET_ACCOUNT,
    accountIdKey
})

const setPortfolio = (portfolio) => ({
    type: ETRADE_SET_PORTFOLIO,
    portfolio
})

const authenticate = () => async dispatch => {
    try {
        const { data } = await getAuthUrl();
        const { authUrl, authenticated } = data;
        if (!authenticated) {
            window.location.replace(authUrl);
        } else {
            dispatch(setSessionAction(true))
        }
    } catch (error) {
        console.log(error);
    }
}

const checkSession = () => async dispatch => {
    try {
        const { data } = await getSession()
        dispatch(setSessionAction(data.authenticated));
    } catch (error) {
        console.log(error);
    }
}

const createSession = (code) => async dispatch => {
    try {
        await postSession(code)
        dispatch(setSessionAction(true));
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

const getAccounts = () => async dispatch => {
    try {
        const { data } = await fetchAccounts()
        dispatch(setAccounts(data));
    } catch (error) {
        const { response } = error;
        if (response && response.data && response.data.detail.includes('token_expired')) {
            dispatch(setSessionAction(false));
        }
        console.log(error);
    }
}

const getPortfolio = (accountIdKey) => async dispatch => {
    try {
        dispatch(setAccount(accountIdKey));
        const { data } = await fetchPortfolio(accountIdKey);
        dispatch(setPortfolio(data));
    } catch (error) {
        console.log(error);
    }
}

export {
    authenticate,
    createSession,
    checkSession,
    getAccounts,
    getPortfolio
}