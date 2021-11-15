import Select from "./elements/Select";
import Scale from "./elements/Scale";
import Checkbox from "./elements/Checkbox";
import Radio from "./elements/Radio";
import Text from "./elements/Text";
import Table from "./elements/Table";
import PureText from "./elements/PureText";
import Image from "./elements/Image";
import validateRequirements from "./../validation/RequirementValidation";

const RenderElements = ({
  props: {
    questionId,
    questionLabel,
    type, // Mandatory fields
    maxValue,
    minValue,
    step, // Scale only
    options, // Checkbox, radio, select only
    row,
    col, // Table only
    placeholder,
    endUnit,
    answerType,
    constraints, // Text only
    answers,
    requirements,
    answer,
    error,
  },
}) => {
  if (validateRequirements(questionId, answers, requirements) === false)
    return <div id={questionId} />;

  switch (type) {
    case "pureText":
      return <PureText id={questionId} label={questionLabel} />;

    case "image":
      return <Image id={questionId} label={questionLabel} />;

    case "select":
      return (
        <Select
          questionId={questionId}
          questionLabel={questionLabel}
          options={options}
          answer={answer}
          type={type}
          error={error}
        />
      );

    case "scale":
      return (
        <Scale
          questionId={questionId}
          questionLabel={questionLabel}
          maxValue={maxValue}
          minValue={minValue}
          step={step}
          answer={answer}
          type={type}
        />
      );

    case "checkbox":
      return (
        <Checkbox
          questionId={questionId}
          questionLabel={questionLabel}
          options={options}
          answer={answer}
          constraints={constraints}
          type={type}
          error={error}
        />
      );

    case "radio":
      return (
        <Radio
          questionId={questionId}
          questionLabel={questionLabel}
          options={options}
          answer={answer}
          type={type}
          error={error}
        />
      );

    case "text":
      return (
        <Text
          questionId={questionId}
          questionLabel={questionLabel}
          answer={answer}
          placeholder={placeholder}
          endUnit={endUnit}
          answerType={answerType}
          constraints={constraints}
          type={type}
          error={error}
        />
      );

    case "table":
      return (
        <Table
          questionId={questionId}
          questionLabel={questionLabel}
          row={row}
          col={col}
          answer={answer}
          type={type}
          error={error}
        />
      );

    default:
      return null;
  }
};

export default RenderElements;
