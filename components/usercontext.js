import React from "react";

export const UserContext = React.createContext({
  accessToken: null,
});

export default function UserProvider({ accessToken, refreshToken, children }) {
  return <UserContext.Provider value={{ accessToken, refreshToken }}>{children}</UserContext.Provider>;
}
