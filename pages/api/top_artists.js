import Axios from "axios";
import querystring from "querystring";
import { capitalize } from "../../utils/utils";

function mapData(data) {
  return data.items.reduce((mapped, item ) => {
    mapped.artists.push({
      image: item.images[1],
      followers: item.followers.total,
      genres: item.genres.map(capitalize),
      popularity: item.popularity,
      name: item.name,
      uri: item.uri,
      id: item.id
    });

    item.genres.map(capitalize).forEach(genre => {
      mapped.genres[genre] = (mapped.genres[genre] ?? 0) + 1;
    })
    return mapped;
  }, {
    artists: [],
    genres: {},
  });
}

export default (req, res) => {
  return Axios.get(
    "https://api.spotify.com/v1/me/top/artists",
    {
      headers: {
        Authorization: req.headers.authorization,
      }
    }
  )
    .then(({ data }) => {
      return res.json(mapData(data))
    })
    .catch(err => {
      res.status(401);
      res.send({ error: 'Unauthorized' })
    });
};

// Axios({
//   url: ",
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// })
//   .then(({ data }) => {
//     dispatch({ type: "success", payload: data.items });
//   })
//   .catch(err => {
//     if (err.response.status === 401) {
//       renewAccessToken();
//     }
//     dispatch({ type: "error", payload: err.response.status })
//   });