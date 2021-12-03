import React, {useState, useEffect} from "react";
import RenderElements from "../renderQuestions/RenderElements";
import {FormContext} from "../renderQuestions/FormContext";
import Confirm from "../components/Confirm";
import FirstPage from "./FirstPage";
import axios from "axios";
import {Typography, AppBar, Button} from "@material-ui/core";
import {useParams} from "react-router";

const UserForm = () => {
  const [allElements, setAllElements] = useState();
  const [steps, setSteps] = useState(-1);
  const [answers] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [errorQuestions, setErrorQuestions] = useState({});
  const {appointmentId} = useParams();

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/open-api/template/latest`
      )
      .then((response) => {
        setAllElements(response.data);
        setLoading(false);
      });
  }, []);

  const checkAdvance = () => {
    const allPageQuestions = allElements.pages[steps].questions;
    const notAnswered = {};
    let allGood = true;

    Object.entries(allPageQuestions).map(([questionID, questionInfo]) => {
      if (
        questionInfo.type !== "pureText" &&
        questionInfo.type !== "image" &&
        questionInfo.type !== "scale" &&
        questionInfo.type !== "table" &&
        (!(questionID in answers) ||
          !answers[questionID].value ||
          Object.keys(answers[questionID].value).length === 0)
      ) {
        notAnswered[questionID] = {value: true, errorText: "Favor preencher."};
        allGood = false;
      }

      // table checking separately
      if (questionInfo.type === "table") {
        if (
          !(questionID in answers) ||
          Object.keys(answers[questionID].value).length !==
            Object.keys(allPageQuestions[questionID].row).length
        ) {
          notAnswered[questionID] = {
            value: true,
            errorText: "Favor preencher.",
          };
          allGood = false;
        }
      }
    });

    setErrorQuestions(notAnswered);
    return allGood;
  };

  const nextStep = () => {
    if (steps === -1 || checkAdvance()) {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });

      setSteps(steps + 1);
    }
  };

  const prevStep = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    setSteps(steps - 1);
  };

  const handleChange = (questionId, answer) => (answers[questionId] = answer);

  const sendData = () => {
    const questions = [];

    Object.entries(answers).map(([questionID, questionInfo]) =>
      questions.push({
        id: questionID,
        value: questionInfo.value,
      })
    );

    const preparedData = {
      questions: questions,
      templateVersion: allElements.templateVersion,
      appointmentId: appointmentId,
    };

    axios
      .post(
        `http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/open-api/form-data/`,
        preparedData
      )
      .then(() => {
        alert("Foi enviado. Parabéns!");
      })
      .catch(() => {
        alert("Ocorreu um erro no POST Template!");
      });
  };

  if (!isLoading) {
    const {questions, pageLabel} = allElements.pages[steps] ?? {};
    const nPages = allElements.pages.length;

    var dict = {};
    Object.keys(allElements["pages"]).forEach(function (key) {
      //questions
      Object.keys(allElements["pages"][key]["questions"]).forEach(function (
        key2
      ) {
        //type
        dict[key2] = [
          allElements["pages"][key]["questions"][key2]["type"],
          allElements["pages"][key]["questions"][key2]["questionLabel"],
        ];
      });
    });

    if (steps === -1)
      return (
        <React.Fragment>
          <FirstPage> </FirstPage>
          <Button
            color="primary"
            variant="contained"
            style={styles.buttonContinue}
            onClick={() => nextStep()}
          >
            {" "}
            Iniciar{" "}
          </Button>
        </React.Fragment>
      );
    else if (!(steps === nPages))
      return (
        <FormContext.Provider value={{handleChange}}>
          <AppBar style={{marginBottom: 20}} position="sticky">
            <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
              {pageLabel}
            </Typography>
          </AppBar>

          <form>
            {questions
              ? Object.entries(questions).map(([questionId, questionInfo]) => (
                  <RenderElements
                    key={questionId}
                    props={{
                      questionId: questionId,
                      answers: answers,
                      error: errorQuestions[questionId],
                      answer: answers[questionId],
                      ...questionInfo,
                    }}
                  />
                ))
              : null}
            <br />
          </form>

          {steps > 0 && (
            <Button
              color="secondary"
              variant="contained"
              style={styles.buttonBack}
              onClick={() => prevStep()}
            >
              Voltar
            </Button>
          )}

          {steps < nPages && (
            <Button
              color="primary"
              variant="contained"
              style={styles.buttonContinue}
              onClick={() => nextStep()}
            >
              Continuar
            </Button>
          )}
        </FormContext.Provider>
      );
    else {
      return (
        <React.Fragment>
          <Confirm dict={dict} answer={answers} />

          <Button
            color="secondary"
            variant="contained"
            style={styles.buttonBack}
            onClick={() => prevStep()}
          >
            Voltar
          </Button>

          <Button
            variant="contained"
            style={styles.buttonSuccess}
            color="primary"
            onClick={() => sendData()}
          >
            Submeter
          </Button>
        </React.Fragment>
      );
    }
  }

  return null;
};

const styles = {
  buttonContinue: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: "#21b6ae",
  },
  buttonBack: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: "#999999",
    color: "#FFFFFF",
  },
  buttonSuccess: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: "#00C0FF",
    color: "#FFFFFF",
  },
};

export default UserForm;
