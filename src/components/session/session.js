import React from 'react';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { createSession } from '../../store/etrade/actions';

export default function SessionMaker() {
const dispatch = useDispatch();
  const { search } = window.location;
  const params = qs.parse(search, { ignoreQueryPrefix: true });
  if (params.oauth_verifier) {
      dispatch(createSession(params.oauth_verifier))
  }

  return (
    <div>
        Session
    </div>
  );
}
