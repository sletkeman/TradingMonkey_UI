import { getAuthUrl, postSession } from '../../services/etrade';

import {
    ETRADE_AUTH,
    ETRADE_SESSION
} from './constants';

const getAuthAction = (authUrl, authenticated) => ({
    type: ETRADE_AUTH,
    authUrl,
    authenticated
});

const getSessionAction = (authenticated) => ({
    type: ETRADE_SESSION,
    authenticated
})

const authenticate = () => async dispatch => {
    try {
        const { data } = await getAuthUrl();
        const { authUrl, authenticated } = data;
        dispatch(getAuthAction(authUrl, authenticated));
    } catch (error) {
        console.log(error);
    }
}

const getSession = (code) => async dispatch => {
    try {
        await postSession(code)
        dispatch(getSessionAction(true));
    } catch (error) {
        console.log(error);
    }
}

export {
    authenticate,
    getSession
}