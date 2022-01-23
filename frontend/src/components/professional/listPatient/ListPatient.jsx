import {useEffect, useState, useMemo} from "react";
import axios from "axios";
import Table from "./table/Table";
import urls from "../../../apiRoutes/apiRoutes";
import auth from "../../../auth/auth";

const ListPatient = ({doctor, token, history}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
      .get(urls.listPatients, config)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          auth.logout();
          history.push("/login");
          alert("Sessão expirou. Logue novamente, por favor!");
        }
      });
  }, [doctor, token, history]);

  const columns = useMemo(
    () => [
      {
        id: "daysToAppointment",
        label: "Dias até Consulta",
      },
      {
        id: "date",
        label: "Data Consulta",
      },
      {
        id: "name",
        label: "Nome",
      },
      {
        id: "email",
        label: "Email",
      },
      {
        id: "cpf",
        label: "CPF",
        disableSorting: "true",
      },
      {
        id: "cellphone",
        label: "Celular",
        disableSorting: "true",
      },
      {
        id: "birth",
        label: "Data Nascimento",
      },
    ],
    []
  );

  if (!isLoading) {
    return (
      <div>
        <Table columns={columns} data={data} token={token} />
      </div>
    );
  }
  return null;
};

export default ListPatient;
