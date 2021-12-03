export default function (questionId, questions, answers) {
  const answer = answers[questionId];

  switch (answer.type) {
    case "text":
      return formatText(answer.value);

    case "scale":
      return formatText(answer.value);

    case "radio":
      return formatMultipleChoices(answer.value, questions[questionId].options);

    case "select":
      return formatMultipleChoices(answer.value, questions[questionId].options);

    case "checkbox":
      return formatMultipleChoices(answer.value, questions[questionId].options);

    case "table":
      return formatTableAnswer(answer.value, questions[questionId].rows);
  }
}

const formatText = (answer) => [answer];

const formatMultipleChoices = (answer, answerOptions) =>
  Object.entries(answerOptions).map(([optionId]) => optionId in answer);

const formatTableAnswer = (answer, tableRows) =>
  Object.entries(tableRows).map(([rowId]) => answer[rowId].colId);
