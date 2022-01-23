import {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/styles";
import ReportTab from "./reportTab/ReportTab";
import axios from "axios";
import urls from "../../../apiRoutes/apiRoutes";
import {
  Dialog,
  Tabs,
  Tab,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  dialogWrapper: {
    padding: "16px",
    position: "absolute",
    top: "40px",
    bottom: "40px",
    minWidth: "80%",
  },
  tabsWrapper: {
    display: "flex",
    justifyContent: "space-around",
  },
  tabWrapper: {
    minWidth: "200px",
  },
}));

const Report = ({id, openPopup, setOpenPopup, token}) => {
  const classes = useStyles();

  const [curTab, setCurTab] = useState(0);
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return null;

    const config = {
      headers: {
        "x-access-token": token,
      },
      params: {
        id: id,
      },
    };

    axios.get(urls.getReport, config).then((response) => {
      setReportData(response.data);
      setIsLoading(false);
    });
  }, [id, token]);

  if (!isLoading) {
    if (reportData)
      return (
        <Dialog classes={{paper: classes.dialogWrapper}} open={openPopup}>
          <Tabs
            className={classes.tabsWrapper}
            value={curTab}
            onChange={(e, value) => setCurTab(value)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {reportData.pages.map((item, index) => (
              <Tab key={index} label={item.pageLabel} />
            ))}
          </Tabs>

          {reportData.pages.map((item, index) => (
            <ReportTab
              className={classes.tabWrapper}
              key={item.pageLabel}
              curTab={curTab}
              index={index}
              values={item.values}
              items={item.items}
              setOpenPopup={setOpenPopup}
              setReportData={setReportData}
            />
          ))}
        </Dialog>
      );
    else
      return (
        <Dialog
          open={openPopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"O paciente ainda não respondeu o formulário!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Espere até que o paciente responda o formulário para que seja
              possível visualizar o relatório, por favor.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPopup(false)}>Fechar</Button>
          </DialogActions>
        </Dialog>
      );
  } else return null;
};

export default Report;
