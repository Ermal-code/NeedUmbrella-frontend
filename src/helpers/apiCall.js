import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"

const refreshAuthLogic = () =>
    axios({
        url: `${process.env.REACT_APP_BE_URL}/users/refreshToken`,
        withCredentials: true,
        method: "post",
    })
        .then(() => Promise.resolve())
        .catch((err) => {
            Promise.reject(err)
            localStorage.setItem("LoggedIn", "false")
            window.location.reload()
        })

createAuthRefreshInterceptor(axios, refreshAuthLogic)

export default axios
