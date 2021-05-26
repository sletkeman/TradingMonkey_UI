import { getAuthUrl, postSession } from '../../services/etrade';
import history from '../../services/history';

import {
    ETRADE_SESSION
} from './constants';

const getSessionAction = (authenticated) => ({
    type: ETRADE_SESSION,
    authenticated
})

const authenticate = () => async dispatch => {
    try {
        const { data } = await getAuthUrl();
        const { authUrl, authenticated } = data;
        if (!authenticated) {
            window.location.replace(authUrl);
        } else {
            dispatch(getSessionAction(true))
        }
    } catch (error) {
        console.log(error);
    }
}

const getSession = (code) => async dispatch => {
    try {
        await postSession(code)
        dispatch(getSessionAction(true));
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

export {
    authenticate,
    getSession
}