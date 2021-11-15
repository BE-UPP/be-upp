import React, {useContext, useState} from "react";
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
  constraints,
  type,
  error,
}) => {
  const {addAnswer, addQuestionError} = useContext(FormContext);
  const [cont, setCont] = useState(0);

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

  const handleClick = (optionId, optionLabel, checked) => {
    let currentCont = cont;

    //console.log("contAntesDoIf: ", currentCont)

    if (checked) {
      currentCont++;
      //console.log("Ifcont: ", currentCont)
    } else {
      currentCont--;
      //console.log("ElseDoIfcont: ", currentCont)
    }

    let hasMaxValue = constraints?.maxValue != null;
    let maxValue = hasMaxValue
      ? constraints?.maxValue
      : Number.POSITIVE_INFINITY;
    const errorMessage = `Selecionar no máximo ${maxValue} itens`;

    if (currentCont > maxValue) {
      addQuestionError(questionId, errorMessage);
      //console.log("deu erro: ", errorMessage);
    } else {
      addAnswer(questionId, updateAnswer(optionId, optionLabel, checked));
      setCont(currentCont);
    }
    // colocar minValue e maxValue no JSON
    // maxVlue impede adicionar uma alternativa e minValue deve restringir a passagem da página.
    // if (curretCont==maxValue && !checked) {
    //   errorMessage = "Selecionar no máximo " {maxValue} " itens";
    // }

    //console.log("cont: ", currentCont)
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
                  handleClick(optionId, optionLabel, event.target.checked)
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
