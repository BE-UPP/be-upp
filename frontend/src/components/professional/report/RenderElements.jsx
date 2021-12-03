import Text from "./elements/Text";
import List from "./elements/List";

const RenderElements = (props) => {
  const {type, values, label, content} = props;

  switch (type) {
    case "text":
      return <Text values={values} label={label} content={content} />;

    case "list":
      return <List values={values} label={label} content={content} />;

    default:
      null;
  }
};

export default RenderElements;
