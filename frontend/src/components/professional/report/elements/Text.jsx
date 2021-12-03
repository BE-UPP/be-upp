import {ListItemText, Typography} from "@material-ui/core";

const Text = (props) => {
  const {values, label, content} = props;
  let text = "";

  content.map((item) => {
    if (typeof item === "number") text += values[item] + " ";
    else text += item + " ";
  });

  return (
    <ListItemText
      primary={
        <>
          <Typography
            sx={{display: "inline", fontWeight: "600", marginRight: "20px"}}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {label}
          </Typography>
          <Typography
            sx={{display: "inline"}}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {text}
          </Typography>
        </>
      }
    />
  );
};

export default Text;
