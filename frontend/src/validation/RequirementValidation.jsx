export default function (questionId, answers, requirements) {
  if (requirements == null || requirements.length == 0) return true;

  const validateTextAnswer = (value, expectedValues) => {
    return expectedValues.includes(value);
  };

  const validateSingleAlternativeAnswer = (value, expectedValues) => {
    return Object.keys(value)[0] == Object.keys(expectedValues)[0];
  };

  const validateMultipleAlternativeAnswer = (value, expectedValues) => {
    let isValid = true;
    Object.entries(value).map(([optionKey, optionVal]) => {
      isValid = isValid && expectedValues[optionKey] == optionVal;
    });
    return isValid;
  };

  const validateRequirement = (value, type, expectedValues) => {
    switch (type) {
      case "text":
        return validateTextAnswer(value, expectedValues);

      case "scale":
        return validateTextAnswer(value, expectedValues);

      case "radio":
        return validateSingleAlternativeAnswer(value, expectedValues);

      case "select":
        return validateSingleAlternativeAnswer(value, expectedValues);

      case "checkbox":
        return validateMultipleAlternativeAnswer(value, expectedValues);

      default:
        return true;
    }
  };

  var isValid = true;
  Object.entries(requirements).map(([questionId, expectedValues]) => {
    //console.log("expectedvalues: ", expectedValues)
    if (answers[questionId] == null) {
      isValid = false;
      return;
    } else {
      isValid =
        isValid &&
        validateRequirement(
          answers[questionId].value,
          answers[questionId].type,
          expectedValues
        );
    }
  });
  return isValid;
}
