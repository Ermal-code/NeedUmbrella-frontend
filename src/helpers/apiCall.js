import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const refreshAuthLogic = (failedRequest) =>
  axios({
    url: `${process.env.REACT_APP_BE_URL}/users/refreshToken`,
    withCredentials: true,
    method: "post",
  }).then((tokenRefreshResponse) => {
    return Promise.resolve();
  });

createAuthRefreshInterceptor(axios, refreshAuthLogic);

export default axios;
