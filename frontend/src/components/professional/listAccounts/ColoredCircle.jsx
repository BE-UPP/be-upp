import {Fragment} from "react";
import style from "./ColoredCircle.module.css";

const ColoredCircle = ({color}) => {
  const styles = {backgroundColor: color};

  return color ? (
    <Fragment>
      <span className={style.coloredCircle} style={styles} />
    </Fragment>
  ) : null;
};

export default ColoredCircle;
