import React, { useContext, useReducer } from "react";
import { UserContext } from "./usercontext";
import styles from "../styles/top.module.scss";
import Axios from "axios";

function reducer(state, action) {
  console.log({ state, action });
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
        data: action.payload,
      };
    }
  }
}

export default function Top({ children }) {
  const { accessToken } = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: undefined,
  });
  React.useEffect(() => {
    dispatch({ type: "loading" });
    accessToken &&
      Axios({
        url: "https://api.spotify.com/v1/me/top/artists",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(({ data }) => {
          dispatch({ type: "success", payload: data.items });
        })
        .catch(console.error);
  }, [accessToken]);
  const results =
    state.data || Array.from({ length: 3 }, (_, index) => ({ id:`fake_${index}` }));
  return (
    <div className={`${styles.list} ${state.loading && styles.loading}`}>
      {results.map((value) => (
        <div key={value.id} className={styles.wrapper}>
          {JSON.stringify(value)}
        </div>
      ))}
    </div>
  );
}
