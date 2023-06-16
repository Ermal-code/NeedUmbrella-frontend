import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { ThemeContext, initialState, Themes } from "./contexts/theme"
import Home from "./components/Home"
import Login from "./components/Login"
import { useState } from "react"
import HeaderWithDarkMode from "./components/HeaderWithDarkMode"

function App() {
    const [isLogedIn, setIsLogedIn] = useState(localStorage.getItem("LoggedIn"))
    const [theme, setTheme] = useState(initialState)

    return (
        <div className={`${theme === Themes.dark ? "dark-mode" : "light-mode"}`}>
            <Router>
                <ThemeContext.Provider value={[theme, setTheme]}>
                    <HeaderWithDarkMode />
                    <Route
                        path="/"
                        exact
                        render={(props) => (
                            <Login {...props} setIsLogedIn={() => setIsLogedIn(localStorage.getItem("LoggedIn"))} />
                        )}
                    >
                        {isLogedIn === "true" && <Redirect to="/home" />}
                    </Route>
                    <Route
                        path="/home"
                        exact
                        render={(props) => (
                            <Home {...props} setIsLogedIn={() => setIsLogedIn(localStorage.getItem("LoggedIn"))} />
                        )}
                    >
                        {isLogedIn !== "true" && <Redirect to="/" />}
                    </Route>
                </ThemeContext.Provider>
            </Router>
        </div>
    )
}

export default App
