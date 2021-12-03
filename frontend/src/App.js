import "./App.css";
import UserForm from "./components/UserForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./components/login/Login";
import MainPage from "./components/professional/MainPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <Route exact path="/fpc/:appointmentId">
          <div className="App">
            <UserForm />
          </div>
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route path="/doctor">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
