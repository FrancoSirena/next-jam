import { CLIENT_ID, REDIRECT_URL, SCOPE, STATE, STATE_KEY } from '../../utils/constants';
import cookies from '../../utils/cookies';

const querystring = require('querystring');

export default cookies((_, res) => {
  const state = STATE;
  const q = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URL,
    state
  });
  const url = `https://accounts.spotify.com/authorize?${q}`
  res.cookie(STATE_KEY, state);
  res.redirect(url);
})
