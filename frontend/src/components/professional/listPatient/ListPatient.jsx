// import {useEffect, useState, useMemo} from "react";
// import axios from "axios";
// import {useState, useMemo} from "react";
import {useMemo} from "react";
import Table from "./table/Table";
import {dummyData} from "./dummyData";

//const ListPatient = ({doctor}) => {
const ListPatient = () => {
  // const [data, setData] = useState();

  /* useEffect(() => {
    axios
      .get(
        "http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/open-api/doctor/appointment", doctor._id
      )
      .then((response) => {
        setData(response.data);
      });
  }, [data]); */

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
        id: "phone",
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

  const data = useMemo(() => dummyData(), []);

  /* {
    _id: "69192af9-de4a-440e-87fd-6a0d33550a5e",
    date: 1588900711000,
    patient: {
      name: "Sharity Saltwell",
      email: "ssaltwell1@cnet.com",
      cpf: "171.149.162.190",
      phone: "(645) 5203684",
      birth: 711396337000,
    }
  }, */

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default ListPatient;
