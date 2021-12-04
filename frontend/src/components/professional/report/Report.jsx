import {useState} from "react";
import {Dialog, Tabs, Tab} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import ReportTab from "./reportTab/ReportTab";
import reportTemplate from "./reportTemplate.json";

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

const Report = ({openPopup, setOpenPopup}) => {
  const classes = useStyles();

  const [curTab, setCurTab] = useState(0);
  const [reportData] = useState(reportTemplate);
  const [isLoading] = useState(false);

  if (!isLoading) {
    return (
      <Dialog classes={{paper: classes.dialogWrapper}} open={openPopup}>
        <Tabs
          className={classes.tabsWrapper}
          value={curTab}
          onChange={(e, value) => setCurTab(value)}
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
          />
        ))}
      </Dialog>
    );
  } else return null;
};

export default Report;
