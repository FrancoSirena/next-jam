import Axios from "axios";
import React, { Context, ReactElement, ReactNode, useContext } from "react";

type UserProviderProps = {
  accessToken: string;
  refreshToken: string;
  children: ReactNode;
};

export const UserContext: Context<UserContextType> = React.createContext({
  accessToken: "",
  renewAccessToken: () => Promise.resolve(null),
  refreshToken: "",
});

export function useUserContext(): UserContextType {
  return useContext(UserContext);
}

/**
 * User Provider which contains the user profile and token keys
 * @returns {ReactElement} UserProvider
 */
export default function UserProvider({
  accessToken,
  refreshToken,
  children,
}: UserProviderProps): ReactElement {
  const [user, setUser] = React.useState({
    accessToken,
    refreshToken,
  });

  const renewAccessToken = async (): Promise<void> => {
    return await Axios.request<any, { access_token: string }>({
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
