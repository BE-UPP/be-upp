import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions} from "@mui/material";
import ColoredCircle from "./ColoredCircle";
import {useState, useEffect} from "react";
import axios from "axios";
import auth from "../../../auth/auth";
import urls from "../../../apiRoutes/apiRoutes";

const ListAccounts = ({doctor, token, history}) => {
  const [doctors, setDoctors] = useState([]);

  const changeStatus = (user) => {
    const data = {
      id: user._id,
    };
    axios
      .post(urls.changeAccount, data, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => {
        alert("Status alterado!");
      })
      .catch((error) => {
        console.log(error);
        alert("Ocorreu um erro");
      });
  };

  useEffect(() => {
    if (!token) return null;

    const config = {
      headers: {
        "x-access-token": token,
      },
      params: {
        id: doctor?._id,
      },
    };

    axios
      .get(urls.listAccounts, config)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          auth.logout();
          history.push("/login");
          alert("Sessão expirou. Logue novamente, por favor!");
        }
      });
  }, [doctor, doctors, token, history]);

  return (
    <div style={{padding: 20}}>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
        style={{minHeight: "100vh"}}
      >
        {doctors.map((item, index) => {
          const btnText = item.status ? "Desativar" : "Ativar";
          const btnColor = item.status ? "green" : "red";
          return (
            <Grid item key={index}>
              <Card sx={{maxWidth: 400, minWidth: 350}}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name} <ColoredCircle color={btnColor} />
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => changeStatus(item)}
                  >
                    {btnText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ListAccounts;
