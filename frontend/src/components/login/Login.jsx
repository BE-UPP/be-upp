/* Credits to FLORIN POP (Login/Register Design) */
import axios from "axios";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import styles from "./Login.module.css";
import auth from "../../auth/auth";
import urls from "../../routes/api/apiRoutes";

const phoneRegex =
  "\\(?[0-9]{2}\\)?\\s?(([0-9]{4}-?[0-9]{4})|([0-9]{5}-?[0-9]{4}))";

const Login = () => {
  const {register, handleSubmit} = useForm();
  const history = useHistory();

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

    if (auth.isAuthenticated()) {
      history.push("/doctor/list");
    }
  }, [history]);

  const onSubmitLogin = (event) => {
    const credentials = {
      email: event.emailLogin,
      password: event.passwordLogin,
    };

    axios
      .post(urls.login, credentials)
      .then((response) => {
        if (response.data["token"]) {
          auth.login({
            doctor: response.data["doctor"],
            token: response.data["token"],
          });
          history.push({pathname: "/doctor/list"});
        } else {
          alert("Erro de Autenticação");
        }
      })
      .catch(() => alert("Erro de Autenticação"));
  };

  const onSubmitRegister = (event) => {
    const credentials = {
      name: event.nameRegister,
      profession: event.professionRegister,
      cellphone: event.cellphoneRegister.replace(/\D+/g, ""),
      phone: event.clinicPhoneRegister ? event.clinicPhoneRegister : "",
      email: event.emailRegister,
      password: event.passwordRegister,
    };

    axios
      .post(urls.registerProfessional, credentials)
      .then((response) => {
        // history.push({
        //   pathname: "/doctor/list",
        //   state: {
        //     doctor: response.data,
        //   },
        // });
        if (
          !alert(`Usuário ${response.data.name} criado!\nSua conta está inativa, em breve você receberá uma mensagem confirmando a ativação de sua conta!`)
        ) {
          window.location.reload();
        }
      })
      .catch(() => alert("Erro de Registro"));
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
              placeholder="Nome Completo *"
              required
              maxLength="50"
              {...register("nameRegister")}
            />

            <input
              className={styles.input}
              type="text"
              placeholder="Profissão *"
              required
              maxLength="30"
              {...register("professionRegister")}
            />

            <input
              className={styles.input}
              type="text"
              pattern={phoneRegex}
              placeholder="Telefone celular *"
              required
              onInvalid={(element) =>
                element.target.setCustomValidity(
                  "Preencha um número de telefone válido no formato (xx) xxxxx-xxxx"
                )
              }
              onInput={(element) => element.target.setCustomValidity("")}
              maxLength="20"
              {...register("cellphoneRegister")}
            />

            <input
              className={styles.input}
              type="text"
              pattern={phoneRegex}
              placeholder="Telefone do consultório/clínica"
              onInvalid={(element) =>
                element.target.setCustomValidity(
                  "Preencha um número de telefone válido no formato (xx) xxxxx-xxxx"
                )
              }
              onInput={(element) => element.target.setCustomValidity("")}
              maxLength="20"
              {...register("clinicPhoneRegister")}
            />

            <input
              className={styles.input}
              type="email"
              placeholder="Email *"
              required
              {...register("emailRegister")}
            />

            <input
              className={styles.input}
              type="password"
              placeholder="Senha *"
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
              <button
                className={`${styles.button} ${styles.ghost}`}
                id="signIn"
              >
                Login
              </button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.h1}> Seja bem-vindo! </h1>
              <p className={styles.p}>
                Entre com seus dados de acesso por favor
              </p>
              <h3> Ainda não tem conta? </h3>
              <button
                className={`${styles.button} ${styles.ghost}`}
                id="signUp"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
