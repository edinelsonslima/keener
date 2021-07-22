import keenerIMG from "../../assets/keener.png";

import "./style.scss";

export default function Login() {
  // async function getLogin() {
  //     const login = await fetch("/login");
  //     const returnLogin = await login.json();
  //     return returnLogin
  // }

  return (
    <main>
      <div className="img-container">
        <img src={keenerIMG} alt="Logo da keener.io innovations" />
      </div>
      <form action="/login" method="post">
        <div className="form-container">
          <label className="form-label" htmlFor="user">
            User
          </label>
          <input className="form-input" type="text" name="user" id="user" />
        </div>
        <div className="form-container">
          <label className="form-label" htmlFor="Password">
            Password
          </label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="form-submit">
          <input className="form-input" type="submit" value="Login" />
          <a href="#" className="cadastro-user">
            Faça seu cadastro
          </a>
        </div>
      </form>
    </main>
  );
}
