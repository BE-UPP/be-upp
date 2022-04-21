import {ListItemText, Typography} from "@material-ui/core";

const Text = (props) => {
  const {values, label, content} = props;
  let text = "";

  content.map((item, i) => {
    let spacing = " ";
    if (i + 1 < content.length) {
      let val = "";
      if (typeof content[i + 1] === "number") val = values[content[i + 1]];
      else val = content[i + 1];
      if (val[0] === "," || val[0] === "." || val === "") spacing = "";
    }
    if (typeof item === "number") text += values[item] + spacing;
    else text += item + spacing;
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
