import Axios from "axios";
import React, { useContext } from "react";
import useRequest from "./hooks/useRequest";

export const UserContext = React.createContext({
  accessToken: null,
});

export function useUserContext() {
  return useContext(UserContext);
}

/**
 * User Provider which contains the user profile and token keys
 * @returns {ReactElement} UserProvider
 */
export default function UserProvider({ accessToken, refreshToken, children }) {
  const [user, setUser] = React.useState({
    accessToken,
    refreshToken,
  });

  const { data: profile } = useRequest({
    url: '/api/profile',
  }, {
    auto: Boolean(accessToken),
    accessToken,
  });


  const renewAccessToken = async () => {
    await Axios.request({
      url: "/api/refresh_token",
      params: {
        refresh_token: refreshToken,
      },
    }).then(({ access_token }) =>
      setUser((prev) => ({
        ...prev,
        accessToken: access_token,
      }))
    );
  };
  return (
    <UserContext.Provider value={{ ...user, profile, renewAccessToken }}>
      {children}
    </UserContext.Provider>
  );
}
