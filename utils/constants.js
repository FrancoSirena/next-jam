const REDIRECT_URL = 'http://localhost:3000/api/callback_uri';
const CLIENT_ID = 'c70b4538181a46cb8382df47066ce22f'
const CLIENT_SECRET = 'cd7030693dff4cb8b801432d80fa7b01'
const SCOPE = 'user-read-private user-read-email user-top-read user-read-currently-playing'
const STATE_KEY = 'spofity_api_state'

module.exports = {
  REDIRECT_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  SCOPE,
  STATE_KEY,
  STATE: `franco-state-${Date.now()}`
}