import React, { useContext } from 'react'
import { FormContext } from '../FormContext';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  FormHelperText,
  Radio as RadioUI,
} from '@material-ui/core'

const Radio = ({ questionId, questionLabel, options, answer, type, error }) => {
  const { handleChange } = useContext(FormContext)

  const updateAnswer = (optionId, optionLabel) => {
    return {
      type: type,
      value: {
        [optionId]: optionLabel
      }
    }
  }

  return (
    <React.Fragment>

      <FormControl component="fieldset" style={styles.questionContainer} error={error?.value}>
        <FormLabel component="legend" style={styles.labelText}> {questionLabel} </FormLabel>
        <RadioGroup defaultValue={typeof answer == "object" ? Object.values(answer.value)[0] : ""}>
          {Object.entries(options).map(([optionId, optionLabel]) =>
            <FormControlLabel
              style={styles.item}
              key={`${questionId}-${optionId}`}
              value={optionLabel}
              control={<RadioUI onChange={() => handleChange(questionId, updateAnswer(optionId, optionLabel))} />}
              label={optionLabel}
            />
          )}
        </RadioGroup>
        <FormHelperText> {error?.errorText} </FormHelperText>
      </FormControl>
    </React.Fragment>
  )
}

const styles = {
  labelText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10
  },
  questionContainer: {
    flex: 1,
    border: '2px solid gray',
    borderRadius: 15,
    padding: 20,
    width: '50%',
    marginBottom: 50
  },
  item: {
    textAlign: "left",
    marginBottom: 10
  }
}

export default Radio