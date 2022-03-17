import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions} from "@mui/material";
import ColoredCircle from "./ColoredCircle";
import {useState, useEffect} from "react";
import axios from "axios";
import auth from "../../../auth/auth";
import urls from "../../../routes/api/apiRoutes";

const ListAccounts = ({doctor, token, history}) => {
  const [doctors, setDoctors] = useState([]);
  const [userChanged, setUserChanged] = useState();

  const changeStatus = (user, index) => {
    const data = {
      id: user._id,
    };
    axios
      .post(urls.changeAccount, data, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        alert("Status alterado!");
        setDoctors(
          doctors.map((item, i) => {
            if (i === index) return response.data;
            return item;
          })
        );
        setUserChanged(response.data);
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

    console.log("re-render");

    axios
      .get(urls.listAccounts, config)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          auth.logout();
          history.push("/login");
          alert("Sessão expirou. Logue novamente, por favor!");
        }
        console.log(error);
      });
  }, [doctor, token, history]);

  useEffect(() => {
    console.log("user mudou");
  }, [userChanged]);

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
                    onClick={() => changeStatus(item, index)}
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
