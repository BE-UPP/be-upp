import styles from "./Grade.module.css";

const Grade = (props) => {
  let elevadoClass = `${styles.stepper_item}`;
  let moderadoClass = `${styles.stepper_item}`;
  let baixoClass = `${styles.stepper_item}`;
  const value = props.values[0];
  const tamA = value > 50 ? 100 : 2 * value;
  const tamB = value > 50 ? 2 * (value - 50) : 0;

  if (value === 100) {
    elevadoClass += ` ${styles.completed}`;
    moderadoClass += ` ${styles.completed}`;
    baixoClass += ` ${styles.active}`;
  } else if (value >= 50 && value < 100) {
    elevadoClass += ` ${styles.completed}`;
    moderadoClass += ` ${styles.active}`;
  } else {
    elevadoClass += ` ${styles.active}`;
  }
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.nota}`}>Nota Qualime: {value}</div>
      <br />
      <div className={`${styles.stepper_wrapper}`}>
        <div className={elevadoClass}>
          <div className={`${styles.step_counter}`}>0</div>
          <div className={`${styles.step_name}`}>Risco Elevado</div>
          <div
            style={{
              position: "absolute",
              content: "",
              borderBottom: "2px solid #4bb543",
              width: `${tamA}%`,
              top: "20px",
              left: "50%",
              zIndex: "3",
            }}
          />
        </div>
        <div className={moderadoClass}>
          <div className={`${styles.step_counter}`}>50</div>
          <div className={`${styles.step_name}`}>Risco Moderado</div>
          <div
            style={{
              position: "absolute",
              content: "",
              borderBottom: "2px solid #4bb543",
              width: `${tamB}%`,
              top: "20px",
              left: "50%",
              zIndex: "3",
            }}
          />
        </div>
        <div className={baixoClass}>
          <div className={`${styles.step_counter}`}>100</div>
          <div className={`${styles.step_name}`}>Risco Baixo</div>
        </div>
      </div>
    </div>
  );
};

export default Grade;
