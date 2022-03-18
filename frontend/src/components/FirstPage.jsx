import React from "react";
import {Typography, AppBar} from "@material-ui/core";
import {ThemeProvider, createTheme} from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
});

const FirstPage = ({message}) => {
  return (
    <React.Fragment>
      <AppBar style={{marginBottom: 20}} position="sticky">
        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
          Seja bem-vindo à Qualime
        </Typography>
      </AppBar>
      <ThemeProvider theme={theme}>
        <Typography
          style={styles.text}
          variant="h4"
          component="div"
          sx={{flexGrow: 1}}
        >
          {message}
        </Typography>
      </ThemeProvider>
    </React.Fragment>
  );
};

const styles = {
  text: {
    padding: 20,
  },
  labelText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  questionContainer: {
    flex: 1,
    border: "2px solid gray",
    borderRadius: 15,
    padding: 20,
    width: "50%",
    marginBottom: 50,
  },
  tableAnswer: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    width: "50%",
  },
};

export default FirstPage;

// {
//   pageLabel: 'Pré Consulta',
//   questions: {
//       Text1: {
//           questionLabel: [
//               'Olá, somos da equipe BeUpp e nossa missão é ajudar as pessoas a ter uma melhor qualidade de vida.',
//               'Para isso, precisamos conhecer um pouco mais sobre você.',
//               'As informações coletadas serão enviadas para o seu profissional de saúde e ajudarão a te conhecer melhor!!!',
//               'Para que você possa aproveitar ao máximo essa atividade, seguem algumas orientações:',
//               '1. Reserve um tempo para preencher o questionário até o fim (para não haver perda de informações);',
//               '2. Antes de começar, já anote o seu peso, altura e sua frequência cardíaca de repouso;',
//               '3. Para calcular a sua frequência cardíaca de repouso:',
//               '- se o seu celular tiver a função de medir a frequência cardíaca, basta colocar o dedo no sensor e verificar o valor no aplicativo',
//               '- se você não sabe medir, siga os passos da página a seguir.'
//           ],
//           type: 'pureText'
//       }
//   }
// },
