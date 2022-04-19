import {
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  Divider,
} from "@material-ui/core";
import RenderElements from "../RenderElements";
import auth from "../../../../auth/auth";
import {useState} from "react";
import urls from "../../../../routes/api/apiRoutes";
import axios from "axios";

const ReportTab = (props) => {
  const {curTab, index, values, items, setOpenPopup, id} = props;
  const session = auth.getToken();
  const [doctor] = useState(session?.doctor);
  const [token] = useState(session?.token);

  const recomputeReport = () => {
    const config = {
      headers: {
        "x-access-token": token,
      },
      params: {
        id: id,
      },
    };

    axios
      .get(urls.recomputeReport, config)
      .then((res) => {
        console.log(res);
        setOpenPopup(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (curTab === index)
    return (
      <>
        <DialogContent sx={{padding: "0px"}}>
          <List>
            {items.map((item, index) => {
              console.log(item);
              console.log(values);
              return (
                <>
                  {item.type === "grade" ? (
                    <RenderElements
                      key={`${item.label} ${values}`}
                      values={values}
                      type={item.type}
                      label={item.label}
                      content={item.content}
                    />
                  ) : (
                    <ListItem alignItems="flex-start">
                      <RenderElements
                        key={`${item.label} ${index}`}
                        values={values}
                        type={item.type}
                        label={item.label}
                        content={item.content}
                      />
                    </ListItem>
                  )}
                  {index !== items.length - 1 && (
                    <Divider variant="middle" component="li" />
                  )}
                </>
              );
            })}
          </List>
        </DialogContent>

        <DialogActions>
          {doctor.role === "admin" ? (
            <Button onClick={() => recomputeReport()}>Reprocessar</Button>
          ) : null}
          <Button onClick={() => setOpenPopup(false)}>Fechar</Button>
        </DialogActions>
      </>
    );
  else return <div />;
};

export default ReportTab;
