import React from 'react'
import {
  Typography,
  AppBar,
  FormLabel
} from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'cursive',
    ].join(','),
  },});


const Success = () => {
  return (
    <React.Fragment>
        <AppBar style={{ marginBottom: 20 }} position='sticky'>
            <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            >
            Muito obrigado!
            </Typography>
        </AppBar>
        <ThemeProvider theme = {theme}>
            <Typography style = {styles.text}
                variant="h4"
                component="div"
                sx={{ flexGrow: 1 }}
                >
                Seus dados foram enviados com sucesso!
            </Typography>        
        </ThemeProvider>
    </React.Fragment>
  )
}

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
    border: '2px solid gray',
    borderRadius: 15,
    padding: 20,
    width: '50%',
    marginBottom: 50,
  },
  tableAnswer: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    width: '50%',
  },
}

export default Success