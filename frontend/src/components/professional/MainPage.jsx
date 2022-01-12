import {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import styles from "./MainPage.module.css";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Appointment from "./appointment/Appointment";
import RegisterPatient from "./registerPatient/RegisterPatient";
import ListPatient from "./listPatient/ListPatient";
import auth from "../../auth/auth";

const MainPage = () => {
  const session = auth.getToken();
  const history = useHistory();
  const [doctor] = useState(session?.doctor);
  const [token] = useState(session?.token);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      history.push("/login");
    }
  }, [history]);

  const [toggleState, setToggleState] = useState(false);
  const [bodyClass, setBodyClass] = useState(`${styles.body}`);

  const toggleMenu = () => {
    const myToggleState = !toggleState;

    if (myToggleState) setBodyClass(bodyClass + ` ${styles.bodyPd}`);
    else setBodyClass(`${styles.body}`);

    setToggleState(myToggleState);
  };

  return (
    <Router>
      <div className={bodyClass}>
        <Header
          onClick={toggleMenu}
          toggleState={toggleState}
          doctor={doctor}
        />

        <Sidebar toggleState={toggleState} />

        <Switch>
          <Route exact path="/doctor/list">
            <ListPatient doctor={doctor} token={token} history={history} />
          </Route>

          <Route exact path="/doctor/appointment">
            <Appointment doctor={doctor} token={token} history={history} />
          </Route>

          <Route exact path="/doctor/register-patient">
            <RegisterPatient doctor={doctor} token={token} history={history} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default MainPage;
