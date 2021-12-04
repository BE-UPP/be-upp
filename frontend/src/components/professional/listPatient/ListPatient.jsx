import {useEffect, useState, useMemo} from "react";
import axios from "axios";
import Table from "./table/Table";

const ListPatient = ({doctor, token}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return null;

    const url = `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/close-api/doctor/appointments`;
    const config = {
      headers: {
        "x-access-token": token,
      },
      params: {
        id: doctor?._id,
      },
    };

    axios.get(url, config).then((response) => {
      setData(response.data);
      setIsLoading(false);
    });
  }, [doctor, token]);

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
        <Table columns={columns} data={data} />
      </div>
    );
  }
  return null;
};

export default ListPatient;
