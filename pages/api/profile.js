import Axios from "axios";

export default function(req, res) {
  return Axios.get(
    "https://api.spotify.com/v1/me",
    {
      headers: {
        Authorization: req.headers.authorization,
      }
    },
  )
  .then(({ data }) => {
    return res.json(data)
  })
  .catch(err => {
    res.status(401);
    res.send({ error: 'Unauthorized' })
  });
}