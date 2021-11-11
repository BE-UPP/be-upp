import React, {useContext} from "react";
import {FormContext} from "../FormContext";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox as CheckboxUI,
} from "@material-ui/core";

const Checkbox = ({
  questionId,
  questionLabel,
  options,
  answer,
  type,
  error,
}) => {
  const {addAnswer} = useContext(FormContext);

  const updateAnswer = (optionId, optionLabel, checked) => {
    if (typeof answer === "undefined") {
      answer = {
        type: type,
        value: {},
      };
    }

    if (checked) answer.value[optionId] = optionLabel;
    else delete answer.value[optionId];

    return answer;
  };

  return (
    <React.Fragment>
      <FormControl
        component="fieldset"
        style={styles.questionContainer}
        error={error?.value}
      >
        <FormLabel component="legend" style={styles.labelText}>
          {questionLabel}
        </FormLabel>
        {Object.entries(options).map(([optionId, optionLabel]) => (
          <FormControlLabel
            key={`${questionId}-${optionId}`}
            value={[optionLabel]}
            style={styles.item}
            control={
              <CheckboxUI
                onClick={(event) =>
                  addAnswer(
                    questionId,
                    updateAnswer(optionId, optionLabel, event.target.checked)
                  )
                }
                checked={answer != undefined ? optionId in answer.value : false}
              />
            }
            label={optionLabel}
          />
        ))}
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
    margin: "auto",
  },
  questionContainer: {
    flex: 1,
    border: "2px solid gray",
    borderRadius: 15,
    padding: 20,
    width: "50%",
    marginBottom: 50,
  },
  item: {
    textAlign: "left",
    marginBottom: 10,
  },
};

export default Checkbox;
