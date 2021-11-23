/* Credits to FLORIN POP (Login/Register Design) */
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import "./Login.css";

const phoneRegex = "\\([0-9]{2}\\)\\s+(([0-9]{4}-?[0-9]{4})|([0-9]{5}-?[0-9]{4}))"

const Login = () => {
  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }, []);

  const {register, handleSubmit} = useForm();

  const onSubmitLogin = (event) => {
    console.log("Apertou Login!");
    console.log(event);
  };

  const onSubmitRegister = (event) => {
    console.log("Apertou Registrar!");
    console.log(event);
  };

  return (
    <div className="body">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form
            className="formLogin"
            action="#"
            onSubmit={handleSubmit(onSubmitRegister)}
          >
            <h1 className="h1Login"> Criar Conta </h1>

            <input
              className="inputLogin"
              type="text"
              placeholder="Nome Completo"
              required
              maxLength="50"
              {...register("nameRegister")}
            />

            <input
              className="inputLogin"
              type="text"
              placeholder="Conselho Regional de Medicina (CRM)"
              required
              maxLength="10"
              {...register("nameRegister")}
            />

            <input
              className="inputLogin"
              type="text"
              pattern={phoneRegex}
              placeholder="Telefone celular"
              required
              onInvalid={element => element.target.setCustomValidity('Preencha um número de telefone válido no formato (xx) xxxxx-xxxx')}
              onInput={element => element.target.setCustomValidity('')}
              maxLength="20"
              {...register("nameRegister")}
            />

          <input
              className="inputLogin"
              type="text"
              pattern={phoneRegex}
              placeholder="Telefone do consultório/clínica"
              required
              onInvalid={element => element.target.setCustomValidity('Preencha um número de telefone válido no formato (xx) xxxxx-xxxx')}
              onInput={element => element.target.setCustomValidity('')}
              maxLength="20"
              {...register("nameRegister")}
            />

            <input
              className="inputLogin"
              type="email"
              placeholder="Email"
              required
              {...register("emailRegister")}
            />

            <input
              className="inputLogin"
              type="password"
              placeholder="Senha"
              required
              minLength="6"
              {...register("passwordRegister")}
            />

            <button className="buttonLogin"> Registrar </button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form
            className="formLogin"
            action="#"
            onSubmit={handleSubmit(onSubmitLogin)}
          >
            <h1 className="h1Login"> Login </h1>

            <input
              className="inputLogin"
              type="email"
              placeholder="Email"
              required
              {...register("emailLogin")}
            />

            <input
              className="inputLogin"
              type="password"
              placeholder="Senha"
              required
              minLength="6"
              {...register("passwordLogin")}
            />

            <button className="buttonLogin"> Login </button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1Login"> Seja bem-vindo! </h1>
              <p className="pLogin"> Registre-se com seus dados pessoais </p>
              <h3> Já tem conta? </h3>
              <button className="buttonLogin ghost" id="signIn">
                {" "}
                Login{" "}
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1Login"> Seja bem-vindo! </h1>
              <p className="pLogin">
                {" "}
                Entre com seus dados de acesso por favor{" "}
              </p>
              <h3> Ainda não tem conta? </h3>
              <button className="buttonLogin ghost" id="signUp">
                {" "}
                Registrar{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
