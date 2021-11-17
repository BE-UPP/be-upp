const moment = require("moment");

export default function (text, type, constraints) {
  switch (type) {
    case "email":
      return validateEmail(text);

    case "date":
      return validateDate(text);

    case "float":
      return validateFloat(text, constraints);

    case "int":
      return validateInteger(text, constraints);

    default:
      return {isValid: true};
  }
}

const validateEmail = (email) => {
  let isValid, errorMessage;

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email)) {
    isValid = true;
  } else {
    isValid = false;
    errorMessage = "Preencha um email válido";
  }

  return {
    isValid: isValid,
    errorMessage: errorMessage,
  };
};

const validateDate = (text) => {
  let isValid, errorMessage;

  if (moment(text, "DD/MM/YYYY", true).isValid()) {
    isValid = true;
  } else {
    isValid = false;
    errorMessage = "Preencha uma data válida no formato dd/mm/yyyy";
  }

  return {
    isValid: isValid,
    errorMessage: errorMessage,
  };
};

const validateFloat = (text, constraints) => {
  let number = Number.parseFloat(text);
  let validation;

  if (!isNaN(text)) {
    validation = validateGeneralNumber(number, constraints);
  } else {
    validation = {
      isValid: false,
      errorMessage: "Preencha um número decimal válido",
    };
  }

  return validation;
};

const validateInteger = (text, constraints) => {
  let number = Number.parseFloat(text);
  let validation;

  if (!isNaN(text) && Number.isInteger(number)) {
    validation = validateGeneralNumber(number, constraints);
  } else {
    validation = {
      isValid: false,
      errorMessage: "Preencha um número inteiro válido",
    };
  }

  return validation;
};

const validateGeneralNumber = (number, constraints) => {
  let isValid, errorMessage;

  let hasMinValue = constraints?.minValue != null;
  let minValue = hasMinValue ? constraints?.minValue : Number.NEGATIVE_INFINITY;

  let hasMaxValue = constraints?.maxValue != null;
  let maxValue = hasMaxValue ? constraints?.maxValue : Number.POSITIVE_INFINITY;

  if (number >= minValue && number <= maxValue) {
    isValid = true;
    errorMessage = null;
  } else {
    isValid = false;
    errorMessage =
      "Número tem que ser " +
      (hasMinValue ? "maior que " + minValue + " " : "") +
      (hasMinValue && hasMaxValue ? "e " : "") +
      (hasMaxValue ? "menor que " + maxValue + " " : "");
  }

  return {
    isValid: isValid,
    errorMessage: errorMessage,
  };
};
