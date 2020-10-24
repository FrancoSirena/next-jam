import Axios from "axios";
import { CLIENT_SECRET, CLIENT_ID } from "../../utils/constants";
import querystring from "querystring";

export default (req, res) => {
  const { refresh_token } = req.query;

  return Axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      refresh_token: refresh_token,
      grant_type: "refresh_token",
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
    .then(({ data: { access_token } }) => {
      return res.json({
        access_token,
      });
    })
    .catch(console.log);
};
