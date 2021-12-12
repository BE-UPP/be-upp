import {useState, useEffect} from "react";
import axios from "axios";
import styles from "./Appointment.module.css";
import {ContentCopy} from "@material-ui/icons";
import {DatePicker} from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import SearchBar from "../searchBar/SearchBar";
import {
  Paper,
  TextField,
  Toolbar,
  IconButton,
  Tooltip,
} from "@material-ui/core";

const Appointment = ({doctor, token}) => {
  const filterPosts = (posts, query) => {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      const postName = post.name.toLowerCase();
      return postName.includes(query.toLowerCase());
    });
  };

  const [isLoading, setIsLoading] = useState(true);
  const [allPatients, setAllPatients] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [selectedPatient, setSelectedPatient] = useState();
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [linkFpc, setLinkFpc] = useState("");
  const [copyMessage, setCopyMessage] = useState(
    "Copiar p/ área de transferência"
  );

  useEffect(() => {
    if (!token) return null;

    const url = `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/close-api/patient/all`;
    const config = {
      headers: {
        "x-access-token": token,
      },
      params: {
        id: doctor?._id,
      },
    };

    axios
      .get(url, config)
      .then((response) => {
        setAllPatients(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Falha no carregamento!");
      });
  }, [doctor, token]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const preparedData = {
      patientId: selectedPatient?._id,
      doctorId: doctor?._id,
      date: appointmentDate.getTime(),
    };

    const url = `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/close-api/appointment/new`;
    const config = {
      headers: {
        "x-access-token": token,
      },
      params: {
        id: doctor?._id,
      },
    };

    axios
      .post(url, preparedData, config)
      .then((response) => {
        const link = `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_PORT}/fpc/${response.data}/`;
        setLinkFpc(link);
        alert(
          "Consulta criada! O link da consulta foi enviada por email para o paciente."
        );
      })
      .catch(() => {
        alert("Ocorreu um erro. Tente novamente!");
      });
  };

  const copy = () => {
    navigator.clipboard.writeText(linkFpc);
    setCopyMessage("Copiado");
  };

  if (!isLoading) {
    const filteredPatients = filterPosts(allPatients, searchQuery);

    return (
      <div>
        <Paper className={styles.paperContainer} elevation={3}>
          <Toolbar className={styles.toolbar}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              name="search"
              label="Procure Paciente"
              placeholder=""
            />
          </Toolbar>

          <div className={styles.listContainer}>
            {filteredPatients.map((post, key) => (
              <Card
                elevation={4}
                key={key}
                className={`${styles.patientCard} ${
                  selectedPatient === post ? styles.activePatient : ""
                }`}
                onClick={() => setSelectedPatient(post)}
                aria-hidden="true"
              >
                <CardHeader title={post.name} subheader={post.email} />

                <CardContent>
                  <div className={styles.infosContainer}>
                    <div className={styles.infoName}>CPF</div>
                    <div className={styles.infoValue}>{post.cpf}</div>
                  </div>
                  <div className={styles.infosContainer}>
                    <div className={styles.infoName}>Celular</div>
                    <div className={styles.infoValue}>{post.cellphone}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Paper>

        <form
          className={styles.endAppointmentContainer}
          onSubmit={handleSubmit}
        >
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            className={styles.datePickerContainer}
          >
            <DatePicker
              className={styles.datePickerContainer}
              label="Data da Consulta"
              inputFormat="dd/MM/yyyy"
              value={appointmentDate}
              onChange={(date) => setAppointmentDate(date)}
              renderInput={(props) => <TextField {...props} helperText="" />}
            />
          </LocalizationProvider>

          <TextField
            className={styles.patientNameContainer}
            InputProps={{readOnly: true}}
            InputLabelProps={{shrink: true}}
            id="standard-read-only-input"
            label="Nome do Paciente"
            value={selectedPatient?.name}
          />

          <input
            className={styles.submitButton}
            type="submit"
            value="CRIAR CONSULTA"
          />

          <TextField
            className={styles.linkContainer}
            InputLabelProps={{shrink: true}}
            id="standard-read-only-input"
            label="Link da Consulta Criada"
            value={linkFpc}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Tooltip
                  title={copyMessage}
                  placement="bottom"
                  onBlur={() =>
                    setCopyMessage("Copiar p/ área de transferência")
                  }
                >
                  <IconButton>
                    <ContentCopy onClick={copy} />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </form>
      </div>
    );
  }

  return null;
};

export default Appointment;
