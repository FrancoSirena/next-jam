import Axios from "axios";
import { identity, isEqual, omit } from "lodash";
import { useEffect, useReducer, useRef } from "react";
import { useUserContext } from "../usercontext";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "success":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default function useRequest(
  params = { method: "GET" },
  config = { auto: true }
) {
  const { accessToken: userAccessToken, refreshToken } = useUserContext();
  const accessToken = config.accessToken || userAccessToken;
  const [state, dispatch] = useReducer(reducer, {
    data: undefined,
    loading: config.auto ?? false,
    error: undefined,
  });

  const lastParams = useRef();
  const CancelToken = useRef(Axios.CancelToken);
  const source = useRef();

  const request = (override = {}) => {
    if (source.current) {
      source.current.cancel("Operation canceled by the user.");
    }
    source.current = CancelToken.current.source();
    dispatch({
      type: "loading",
    });
    Axios.request({
      method: 'GET',
      ...params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Refresh-token": refreshToken,
        'Content-Type': 'application/json'
      },
      transformResponse: Axios.defaults.transformResponse.concat(params.transformResponse || identity),
      ...override,
      cancelToken: source.current.token,
    })
      .then((data) => {
        dispatch({
          type: "success",
          payload: data.data,
        });
      })
      .catch((err) => {
        if (!Axios.isCancel(err)) {
          dispatch({
            type: "error",
            payload: err,
          });
        }
      });
  };

  useEffect(() => {
    const compare = omit(params, ["transformResponse"]);
    if (config.auto && accessToken && !isEqual(lastParams.current, compare)) {
      lastParams.current = compare;
      request();
    }
  }, [params, config, accessToken]);

  return {
    request,
    ...state,
  };
}
