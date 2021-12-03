import {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

import styles from "./MainPage.module.css";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Appointment from "./appointment/Appointment";
import RegisterPatient from "./registerPatient/RegisterPatient";
import ListPatient from "./listPatient/ListPatient";

const MainPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    if (location.state === undefined) history.push("/login");
    else setDoctor(location.state.doctor);
  }, [location, history, doctor]);

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
            <ListPatient doctor={doctor} />
          </Route>

          <Route exact path="/doctor/appointment">
            <Appointment doctor={doctor} />
          </Route>

          <Route exact path="/doctor/register-patient">
            <RegisterPatient />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default MainPage;
