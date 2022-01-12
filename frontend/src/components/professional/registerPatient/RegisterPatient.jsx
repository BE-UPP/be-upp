import {useState} from "react";
import styles from "./RegisterPatient.module.css";
import {Paper, TextField, Grid} from "@material-ui/core";
import {DatePicker} from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import axios from "axios";
import InputMask from "react-input-mask";
import urls from "../../../apiRoutes/apiRoutes";
import auth from "../../../auth/auth";

const RegisterPatient = ({doctor, token, history}) => {
  const initInfo = {
    name: "",
    email: "",
    cpf: "",
    cellphone: "",
    birth: new Date(),
  };

  const [patientInfo, setPatientInfo] = useState(initInfo);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      const preparedData = {
        ...patientInfo,
        cellphone: patientInfo.cellphone.replace(/\D+/g, ""),
        cpf: patientInfo.cpf.replace(/\D+/g, ""),
        birth: patientInfo.birth.getTime(),
      };

      const config = {
        headers: {
          "x-access-token": token,
        },
        params: {
          id: doctor?._id,
        },
      };

      axios
        .post(urls.registerPatient, preparedData, config)
        .then(() => {
          alert("O paciente foi cadastrado!");
        })
        .catch((error) => {
          if (error.response.status === 500) {
            auth.logout();
            history.push("/login");
            alert("Sessão expirou. Logue novamente, por favor!");
          }
        });
    }
  };

  const handleInputChange = (name, value) => {
    switch (name) {
      case "birth":
        setPatientInfo({
          ...patientInfo,
          birth: value,
        });
        validate({birth: value});
        break;

      default:
        setPatientInfo({
          ...patientInfo,
          [name]: value,
        });
        validate({[name]: value});
    }
  };

  const validate = (values = patientInfo) => {
    let e = {...errors};

    if ("name" in values) e.name = values.name ? "" : "Favor Preencher.";
    if ("email" in values)
      e.email =
        /$^|.+@.+[.].+/.test(values.email) && values.email
          ? ""
          : "Email Inválido.";
    if ("cpf" in values)
      e.cpf =
        /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/.test(
          values.cpf
        ) && values.cpf
          ? ""
          : "CPF Inválido.";
    if ("cellphone" in values)
      e.cellphone =
        /^[1-9]{2} (?:9[1-9])[0-9]{3}-[0-9]{4}$/.test(values.cellphone) &&
        values.cellphone
          ? ""
          : "Número de Celular Inválido.";
    if ("birth" in values) e.birth = values.birth ? "" : "Favor Preencher.";

    setErrors({
      ...e,
    });

    if (values === patientInfo)
      return Object.values(e).every((item) => item === "");
  };

  const resetForm = () => {
    setPatientInfo(initInfo);
  };

  return (
    <Paper elevation={3} className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Grid className={styles.gridContainer}>
          <Grid item xs={12} md={6}>
            <TextField
              autoComplete="off"
              className={styles.text}
              variant="outlined"
              name="name"
              label="Nome Completo"
              value={patientInfo.name}
              placeholder="José Maria da Silva"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              {...(errors.name && {error: true, helperText: errors.name})}
            />

            <TextField
              autoComplete="off"
              className={styles.text}
              variant="outlined"
              name="email"
              label="Email"
              value={patientInfo.email}
              placeholder="qualime@gov.br"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              {...(errors.email && {error: true, helperText: errors.email})}
            />

            <InputMask
              maskChar={null}
              mask="999.999.999-99"
              value={patientInfo.cpf}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              {(props) => (
                <TextField
                  {...props}
                  autoComplete="off"
                  className={styles.text}
                  variant="outlined"
                  name="cpf"
                  label="CPF"
                  placeholder="123.456.789-10"
                  {...(errors.cpf && {error: true, helperText: errors.cpf})}
                />
              )}
            </InputMask>
          </Grid>

          <Grid item xs={12} md={6}>
            <InputMask
              maskChar={null}
              mask="99 99999-9999"
              value={patientInfo.cellphone}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              {(props) => (
                <TextField
                  {...props}
                  autoComplete="off"
                  className={styles.text}
                  variant="outlined"
                  name="cellphone"
                  label="Telefone Celular"
                  placeholder="DDD 91234-5678"
                  {...(errors.cellphone && {
                    error: true,
                    helperText: errors.cellphone,
                  })}
                />
              )}
            </InputMask>

            <div className={styles.text}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data de Nascimento"
                  inputFormat="dd/MM/yyyy"
                  name="birth"
                  value={patientInfo.birth}
                  onChange={(e) => handleInputChange("birth", e)}
                  renderInput={(props) => (
                    <TextField {...props} helperText="" />
                  )}
                  {...(errors.birth && {error: true, helperText: errors.birth})}
                />
              </LocalizationProvider>
            </div>

            <div className={styles.buttonContainer}>
              <input
                className={styles.buttonSubmit}
                type="submit"
                value="CADASTRAR"
              />
              <input
                type="reset"
                className={styles.buttonReset}
                value="RESETAR"
                onClick={resetForm}
              />
            </div>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default RegisterPatient;
