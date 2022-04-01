import React, {useContext, useState, useEffect} from "react";
import {FormContext} from "../FormContext";
import {TextField, InputAdornment} from "@material-ui/core";
import validateText from "../../validation/TextValidation";
import InputMask from "react-input-mask";

const Text = ({
  questionId,
  questionLabel,
  placeholder,
  endUnit,
  answerType,
  constraints,
  answer,
  type,
  error,
  mask,
  maskRegex,
}) => {
  useEffect(() => {
    setInputValue(answer?.value || "");
  }, [answer]);

  const [inputValue, setInputValue] = useState("");
  const {addAnswer, removeAnswer, addQuestionError} = useContext(FormContext);

  const updateAnswer = (answer) => {
    return {
      type: type,
      value: answer,
    };
  };

  const handleTextChange = (event) => {
    let value = event.target.value;
    if (maskRegex) {
      const stringToRegex = (str) => {
        const main = str.match(/\/(.+)\/.*/)[1];
        const options = str.match(/\/.+\/(.*)/)[1];

        return new RegExp(main, options);
      };
      value = value.replace(stringToRegex(maskRegex), "");
    }
    if (answerType === "email") {
      value = value.trim();
    }
    setInputValue(value);
  };

  const isEmptyOrSpaces = (str) => {
    return str === undefined || str?.trim() === "";
  };

  const handleBlur = () => {
    if (isEmptyOrSpaces(inputValue)) {
      removeAnswer(questionId);
      return;
    }

    const {isValid, errorMessage} = validateText(
      inputValue,
      answerType,
      constraints
    );

    if (isValid) {
      addAnswer(questionId, updateAnswer(inputValue));
    } else {
      addQuestionError(questionId, errorMessage);
    }
  };

  const textField = (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end"> {endUnit} </InputAdornment>
        ),
      }}
      InputLabelProps={{shrink: true}}
      key={questionId}
      style={styles.floatingText}
      label={questionLabel}
      placeholder={placeholder}
      variant="outlined"
      defaultValue={answer?.value}
      onBlur={handleBlur}
      error={error?.value}
      helperText={error?.errorText}
      onChange={(event) => handleTextChange(event)}
    />
  );

  let result = textField;
  if (mask) {
    result = (
      <InputMask
        maskChar={null}
        value={inputValue}
        mask={mask}
        onChange={(e) => handleTextChange(e)}
        disabled={false}
        onBlur={handleBlur}
      >
        {(props) => (
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end"> {endUnit} </InputAdornment>
              ),
            }}
            {...props}
            InputLabelProps={{shrink: true}}
            key={questionId}
            style={styles.floatingText}
            label={questionLabel}
            placeholder={placeholder}
            variant="outlined"
            error={error?.value}
            helperText={error?.errorText}
          />
        )}
      </InputMask>
    );
  }

  return (
    <React.Fragment>
      {result}
      <br />
    </React.Fragment>
  );
};

const styles = {
  questionContainer: {
    flex: 1,
    border: "2px solid gray",
    borderRadius: 15,
    padding: 20,
    width: "50%",
    marginBottom: 50,
  },
  floatingText: {
    marginBottom: 50,
    width: "auto",
  },
};

export default Text;
