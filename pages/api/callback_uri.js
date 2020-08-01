import Axios from "axios";
import { query } from "express";
import {
  CLIENT_SECRET,
  CLIENT_ID,
  REDIRECT_URL,
  STATE_KEY,
} from "../../utils/constants";
const querystring = require("querystring");

export default (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  if (state !== storedState) {
    res.sendStatus(500)
    res.sendMessage('Unable to get token')
    return res;
  }
  return Axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      code,
      redirect_uri: REDIRECT_URL,
      grant_type: "authorization_code",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      },
    }
  )
    .then(({ data: { access_token, refresh_token }}) => {
      return res.redirect(`/?${querystring.stringify({ access_token, refresh_token })}`);
    })
    .catch(console.log);
};
