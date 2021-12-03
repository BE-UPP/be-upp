import React, {useContext} from "react";
import {FormContext} from "../FormContext";
import {
  Select as SelectUI,
  MenuItem,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";

const Select = ({questionId, questionLabel, options, answer, type, error}) => {
  const {addAnswer, removeAnswer} = useContext(FormContext);

  const updateAnswer = (event, questionId) => {
    const optionId = event.target.value;
    const optionLabel = options[optionId];

    if (optionId == "default") {
      removeAnswer(questionId);
      return;
    }

    addAnswer(questionId, {
      type: type,
      value: {
        [optionId]: optionLabel,
      },
    });
  };

  return (
    <React.Fragment>
      <FormLabel component="legend" style={styles.labelText}>
        {questionLabel}
      </FormLabel>
      <br />

      <FormControl style={styles.selectBox} error={error?.value}>
        <SelectUI
          key={questionId}
          inputProps={{MenuProps: {disableScrollLock: true}}}
          onChange={(event) => updateAnswer(event, questionId)}
          value={answer != undefined ? Object.keys(answer.value)[0] : "default"}
        >
          <MenuItem key="default" value="default">
            Escolha sua opção
          </MenuItem>
          {Object.entries(options).map(([optionId, optionLabel]) => (
            <MenuItem key={optionId} value={optionId}>
              {optionLabel}
            </MenuItem>
          ))}
        </SelectUI>
        <FormHelperText> {error?.errorText} </FormHelperText>
      </FormControl>

      <br />
    </React.Fragment>
  );
};

const styles = {
  labelText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  selectBox: {
    width: 100,
    marginBottom: 50,
  },
};

export default Select;
