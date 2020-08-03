import Axios from "axios";
import React from "react";
const querystring = require("querystring");

export const UserContext = React.createContext({
  accessToken: null,
});

export default function UserProvider({ accessToken, refreshToken, children }) {
  const [user, setUser] = React.useState({
    accessToken,
    refreshToken,
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
    <UserContext.Provider value={{ ...user, renewAccessToken }}>
      {children}
    </UserContext.Provider>
  );
}
