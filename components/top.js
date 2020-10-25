import React, {  useReducer } from "react";

import Artists from "./artists";
import Genres from "./genres";
import useRequest from "./hooks/useRequest";

function reducer(state, action) {
  switch (action.type) {
    case "filter": {
      const filter = new Set(state.filter);
      if (!filter.delete(action.payload.filter)) {
        filter.add(action.payload.filter);
      }
      const current =
        filter.keys === 0
          ? action.payload.full
          : action.payload.full.filter(({ genresSet }) =>
              [...filter].every((gen) => genresSet.has(gen))
            );
      return {
        ...state,
        filter,
        current,
      };
    }
  }
}

/**
 * Display the top genres and top artists
 * It also manages the filter by genre feature, to
 * search for artists associated with that specific genre
 * @returns {ReactElement} Top
 */
export default function Top() {
  const {
    loading,
    data = {},
  } = useRequest({
    method: 'GET',
    url: "api/top_artists",
    transformResponse: data => {
      const artists = data.artists.map((item) => ({
        ...item,
        genresSet: new Set(item.genres),
      }));
      return {full: artists, genres: data.genres}
    }
  })
  const [state, dispatch] = useReducer(reducer, {
    filter: undefined,
    current: undefined,
  });

  function filterByGenre(genre) {
    dispatch({ type: "filter", payload: { filter: genre, full: data.full } });
  }

  return (
    <>
      <Genres
        loading={loading}
        filter={state.filter}
        applyFilter={filterByGenre}
        data={data.genres}
      />
      <Artists loading={loading} applyFilter={filterByGenre} data={state.current || data.full} />
    </>
  );
}
