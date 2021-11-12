/* Credits to FLORIN POP (Login/Register Design) */
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styles from './Login.module.css';

const Login = () => {
  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add(styles.rightPanelActive);
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove(styles.rightPanelActive);
    });
  }, []);

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmitLogin = (event) => {
    const credentials = {
      email: event.emailLogin,
      password: event.passwordLogin
    }

    axios
      .post(`http://localhost:3001/open-api/doctor/login`, credentials)
      .then((response) => {
        history.push({
          pathname: '/doctor',
          state: {
            doctor: response.data
          }
        })
      })
      .catch(() => alert("Erro de Autenticação"))
  };

  const onSubmitRegister = (event) => {
    console.log("Apertou Registrar!");
    console.log(event);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container} id="container">
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form
            className={styles.form}
            action="#"
            onSubmit={handleSubmit(onSubmitRegister)}
          >
            <h1 className={styles.h1}> Criar Conta </h1>

            <input
              className={styles.input}
              type="text"
              placeholder="Nome Completo"
              required
              maxLength="50"
              {...register("nameRegister")}
            />

            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              required
              {...register("emailRegister")}
            />

            <input
              className={styles.input}
              type="password"
              placeholder="Senha"
              required
              minLength="6"
              {...register("passwordRegister")}
            />

            <button className={styles.button}> Registrar </button>
          </form>
        </div>

        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form
            className={styles.form}
            action="#"
            onSubmit={handleSubmit(onSubmitLogin)}
          >
            <h1 className="{styles.h1}"> Login </h1>

            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              required
              {...register("emailLogin")}
            />

            <input
              className={styles.input}
              type="password"
              placeholder="Senha"
              required
              minLength="6"
              {...register("passwordLogin")}
            />

            <button className={styles.button}> Login </button>
          </form>
        </div>

        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 className={styles.h1}> Seja bem-vindo! </h1>
              <p className={styles.p}> Registre-se com seus dados pessoais </p>
              <h3> Já tem conta? </h3>
              <button className={`${styles.button} ${styles.ghost}`} id="signIn">
                Login
              </button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.h1}> Seja bem-vindo! </h1>
              <p className={styles.p}>
                Entre com seus dados de acesso por favor
              </p>
              <h3> Ainda não tem conta? </h3>
              <button className={`${styles.button} ${styles.ghost}`} id="signUp">
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;
