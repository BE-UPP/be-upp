import {
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  Divider,
} from "@material-ui/core";
import RenderElements from "../RenderElements";

const ReportTab = (props) => {
  const {curTab, index, values, items, setOpenPopup} = props;
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
          <Button onClick={() => setOpenPopup(false)}>Fechar</Button>
        </DialogActions>
      </>
    );
  else return <div />;
};

export default ReportTab;
