import React, {useContext, useEffect, useState} from "react";
import {FormContext} from "../FormContext";
import {FormLabel, Slider} from "@material-ui/core";

const Scale = ({
  questionId,
  questionLabel,
  minValue,
  maxValue,
  step,
  answer,
  type,
  error,
}) => {
  const marks = [];
  const [label, setLabel] = useState(questionLabel);
  const [labelColor, setLabelColor] = useState("grey");

  for (var i = minValue; i <= maxValue; i += step) {
    marks.push({
      value: i,
      label: i.toString(),
    });
  }

  const {addAnswer} = useContext(FormContext);

  const updateAnswer = (event) => {
    return {
      type: type,
      value: event.target.value,
    };
  };

  useEffect(() => {
    if (error && error.value) {
      setLabel(questionLabel + " Favor preencher.");
      setLabelColor("red");
    } else {
      setLabelColor("grey");
      setLabel(questionLabel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <React.Fragment>
      <FormLabel style={getStyles(labelColor).labelText} required={true}>
        {" "}
        {label}{" "}
      </FormLabel>
      <br />

      <Slider
        key={questionId}
        style={getStyles(labelColor).sliderStyle}
        marks={marks}
        valueLabelDisplay="auto"
        min={minValue}
        max={maxValue}
        onChange={(event) => addAnswer(questionId, updateAnswer(event))}
        value={answer != undefined ? answer?.value : minValue}
      />
      <br />
    </React.Fragment>
  );
};

const getStyles = (labelColor) => {
  const styles = {
    labelText: {
      fontSize: 20,
      paddingLeft: 10,
      paddingRight: 10,
      margin: "auto",
      color: labelColor,
    },
    sliderStyle: {
      width: "55%",
      marginTop: 10,
      marginBottom: 80,
    },
  };
  return styles;
};

export default Scale;
