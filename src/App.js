import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact render={(props) => <Login {...props} />} />
        <Route path="/home" exact render={(props) => <Home {...props} />} />
      </Router>
    </div>
  );
}

export default App;
