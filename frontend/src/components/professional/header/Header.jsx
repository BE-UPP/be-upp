import {useState, useEffect} from "react";
import styles from "./Header.module.css";

const Header = ({onClick, toggleState, doctor}) => {
  const [toggleClass, setToggleClass] = useState("bx bx-menu");
  const [headerClass, setHeaderClass] = useState(styles.header);

  useEffect(() => {
    if (toggleState) {
      setToggleClass("bx bx-x");
      setHeaderClass(`${styles.header} ${styles.bodyPd}`);
    } else {
      setToggleClass("bx bx-menu");
      setHeaderClass(`${styles.header}`);
    }
  }, [toggleState]);

  return (
    <header className={headerClass} id="header">
      <div className={styles.headerToggle}>
        <i
          className={toggleClass}
          id="header-toggle"
          onClick={() => onClick()}
          aria-hidden="true"
        />
      </div>

      <p className={styles.headerName}>{doctor?.name.toUpperCase()}</p>
    </header>
  );
};

export default Header;
