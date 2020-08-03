import React, { useContext, useReducer } from "react";
import { UserContext } from "./usercontext";

import Axios from "axios";

import Artists from "./artists";
import Genres from "./genres";

function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return {
        ...state,
        loading: true,
      };
    }
    case "success": {
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        full: action.payload.full,
        genres: action.payload.genres,
      };
    }
    case "filter": {
      const filter = new Set(state.filter);
      if (!filter.delete(action.payload.filter)) {
        filter.add(action.payload.filter);
      }
      const data =
        filter.keys === 0
          ? state.full
          : state.full.filter(({ genresSet }) =>
              [...filter].every((gen) => genresSet.has(gen))
            );
      return {
        ...state,
        loading: false,
        filter,
        data,
      };
    }
    case "error": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
  }
}

export default function Top() {
  const { accessToken, refreshToken } = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: undefined,
  });
  React.useEffect(() => {
    dispatch({ type: "loading" });
    accessToken &&
      Axios({
        url: "api/top_artists",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Refresh-token": refreshToken,
        },
      })
        .then(({ data }) => {
          const artists = data.artists.map((item) => ({
            ...item,
            genresSet: new Set(item.genres),
          }));
          dispatch({
            type: "success",
            payload: { data: artists, full: artists, genres: data.genres },
          });
        })
        .catch(() => {
          window.location.replace("/api/login");
        });
  }, [accessToken]);

  function filterByGenre(genre) {
    dispatch({ type: "filter", payload: { filter: genre } });
  }

  return (
    <>
      <Genres
        loading={state.loading}
        filter={state.filter}
        applyFilter={filterByGenre}
        data={state.genres}
      />
      <Artists loading={state.loading} applyFilter={filterByGenre} data={state.data} />
    </>
  );
}
