import {useState, useEffect} from "react";
import styles from "./Sidebar.module.css";
import {SidebarItems} from "./SidebarItems";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import auth from "../../../auth/auth";

const Sidebar = ({toggleState, admin}) => {
  const location = useLocation();
  const [navClass, setNavClass] = useState(styles.lNavbar);
  const [linkActive, setLinkActive] = useState();

  useEffect(() => {
    SidebarItems.map((item, index) => {
      if (item.path === location.pathname) setLinkActive(index);
    });
  });

  useEffect(() => {
    if (toggleState) {
      setNavClass(`${styles.lNavbar} ${styles.show}`);
    } else {
      setNavClass(`${styles.lNavbar}`);
    }
  }, [toggleState]);

  return (
    <div className={navClass} id="nav-bar">
      <nav className={styles.nav}>
        <div>
          <Link to="/doctor/list" className={`${styles.a} ${styles.navLogo}`}>
            <i className={`bx bx-layer ${styles.navLogoIcon}`} />
            <span className={styles.navLogoName}>QUALIME</span>
          </Link>

          <div className={styles.navList}>
            {SidebarItems.map((item, index) => {
              let icon = <i className={`bx ${item.icon} ${styles.navIcon}`} />;
              let text = (
                <span className={`${styles.navName}`}>{item.text}</span>
              );
              if (item.admin && !admin) {
                icon = "";
                text = "";
              }
              return (
                <Link
                  onClick={() => setLinkActive(index)}
                  key={index}
                  replace
                  to={item.path}
                  className={`${styles.a} ${styles.navLink} ${
                    index === linkActive ? styles.active : ""
                  }`}
                >
                  {icon}
                  {text}
                </Link>
              );
            })}
          </div>
        </div>

        <a
          href="/login"
          onClick={() => {
            auth.logout();
          }}
          className={`${styles.a} ${styles.navLink}`}
        >
          <i className={`bx bx-log-out ${styles.navIcon}`} />
          <span className={`${styles.navName}`}>Sair</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
