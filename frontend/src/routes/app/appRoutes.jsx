const urls = {
  fpcBase: `/fpc`,
};

let iniUrl = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
  iniUrl = `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_PORT}`;
else iniUrl = `https://${process.env.REACT_APP_API_DOMAIN}`;

for (const i in urls) urls[i] = iniUrl + urls[i];

export default urls;
