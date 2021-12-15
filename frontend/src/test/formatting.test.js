import SendDataFormatting from "../formatting/SendDataFormatting";

const answers = {
  city: {
    type: "text",
    value: "34",
  },
  height: {
    type: "scale",
    value: "180",
  },
  diseases: {
    type: "checkbox",
    value: {
      hypertension: "Hipertensão",
      covid: "Covid-19",
    },
  },
  exercise: {
    type: "radio",
    value: {
      little: "Pouco",
    },
  },
  gym: {
    type: "select",
    value: {
      yes: "Sim",
    },
  },
  nutrition: {
    type: "table",
    value: {
      vitaminA: {
        colId: "little",
        rowLabel: "Vitamina A",
        colLabel: "Pouco",
      },
      vitaminB: {
        colId: "moderate",
        rowLabel: "Vitamina B",
        colLabel: "Moderado",
      },
    },
  },
};

const questions = {
  city: {
    type: "text",
  },
  height: {
    type: "scale",
  },
  diseases: {
    type: "checkbox",
    options: {
      diabetes: "Diabetes",
      hypertension: "Hipertensão",
      covid: "Covid-19",
    },
  },
  exercise: {
    type: "radio",
    options: {
      little: "Pouco",
      moderate: "Moderado",
      high: "Alto",
    },
  },
  gym: {
    type: "select",
    options: {
      yes: "Sim",
      no: "Não",
    },
  },
  nutrition: {
    type: "table",
    rows: {
      vitaminA: "Vitamina A",
      vitaminB: "Vitamina B",
    },
    cols: {
      little: "Pouco",
      moderate: "Moderado",
      high: "Alto",
    },
  },
};

describe("testing SendDataFormatting", () => {
  it("testing text formatting", () => {
    const formatted = SendDataFormatting("city", questions, answers);
    expect(formatted).toStrictEqual(["34"]);
  });

  it("testing scale formatting", () => {
    const formatted = SendDataFormatting("height", questions, answers);
    expect(formatted).toStrictEqual(["180"]);
  });

  it("testing checkbox formatting", () => {
    const formatted = SendDataFormatting("diseases", questions, answers);
    expect(formatted).toStrictEqual([false, true, true]);
  });

  it("testing radio formatting", () => {
    const formatted = SendDataFormatting("exercise", questions, answers);
    expect(formatted).toStrictEqual(["little", "Pouco"]);
  });

  it("testing select formatting", () => {
    const formatted = SendDataFormatting("gym", questions, answers);
    expect(formatted).toStrictEqual(["yes", "Sim"]);
  });

  it("testing table formatting", () => {
    const formatted = SendDataFormatting("nutrition", questions, answers);
    expect(formatted).toStrictEqual(["little", "moderate"]);
  });
});