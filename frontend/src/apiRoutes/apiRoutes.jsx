const urls = {
  login: `/open-api/doctor/login`,
  getTemplate: `/open-api/template/latest`,
  postFpc: `/open-api/form-data/new`,
  registerProfessional: `/open-api/doctor/new`,
  getAppointments: `/close-api/patient/all`,
  postAppointment: `/close-api/appointment/new`,
  listPatients: `/close-api/doctor/appointments`,
  registerPatient: `/close-api/patient/new`,
  getReport: `/close-api/final-report/by-id`,
};

let iniUrl = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
  iniUrl = `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}`;
else iniUrl = `https://${process.env.REACT_APP_API_DOMAIN}/api`;

for (const i in urls) urls[i] = iniUrl + urls[i];

export default urls;
