import {ListItemText, Typography} from "@material-ui/core";
import RenderElements from "../RenderElements";

const List = (props) => {
  const {values, label, content} = props;

  return (
    <ListItemText
      primary={
        <Typography
          sx={{display: "inline", fontWeight: "600"}}
          component="span"
          variant="body2"
          color="text.primary"
        >
          {label}
        </Typography>
      }
      secondary={
        <ul>
          {content.map((item, index) => (
            <li key={`${item.label} ${index}`}>
              <RenderElements
                values={values}
                type={item.type}
                label={item.label}
                content={item.content}
              />
            </li>
          ))}
        </ul>
      }
    />
  );
};

export default List;
