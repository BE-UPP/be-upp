export default function (questionId, questions, answers) {
  const answer = answers[questionId];
  
  switch (answer.type) {
    case "text":
      return formatText(answer.value);

    case "scale":
      return formatText(answer.value);

    case "radio":
      return formatSingleChoice(answer.value);

    case "select":
      return formatSingleChoice(answer.value);

    case "checkbox":
      return formatMultipleChoices(answer.value, questions[questionId].options);

    case "table":
      return formatTableAnswer(answer.value, questions[questionId].row);
  }
}

const formatText = (answer) => [answer];

const formatSingleChoice = (answer) => {
  return [Object.keys(answer)[0], Object.values(answer)[0]]
  //return Array.prototype.concat(Object.keys(answer), Object.values(answer));
}

const formatMultipleChoices = (answer, answerOptions) =>
  Object.entries(answerOptions).map(([optionId]) => optionId in answer);

const formatTableAnswer = (answer, tableRows) =>
  Object.entries(tableRows).map(([rowId]) => answer[rowId].colId);