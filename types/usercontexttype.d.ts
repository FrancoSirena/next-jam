type UserContextType = {
  accessToken: string;
  renewAccessToken: Function<Promise<void>>;
  refreshToken: string;
};
