import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import eyeIMG from "../../assets/eye.png";
import eyeOffIMG from "../../assets/eye-off.png";
import keenerIMG from "../../assets/logo.png";

import "./style.scss";

export default function Login() {
  //Mudança de visibilidade no password
  const [eye, setEye] = useState(true);
  const [srcEye, setSrcEye] = useState(eyeOffIMG);
  const [typePass, serTypePass] = useState("password");
  function passwordEye() {
    if (eye) {
      setEye(false);
      setSrcEye(eyeIMG);
      serTypePass("text");
    } else {
      setEye(true);
      setSrcEye(eyeOffIMG);
      serTypePass("password");
    }
  }

  //Bordar no error
  const [boderInput, serBorderInput] = useState(false);
  const border = {
    boxShadow: "inset 0 0 7px red",
  };

  //Form Submit
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handlePostLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/login",
        data: {
          user: user,
          password: password,
        },
      });
      sessionStorage.setItem("auth", data.auth);
      sessionStorage.setItem("user_id", data.user);
      serBorderInput(false);
      history.push("/");
    } catch (error) {
      console.error("Erro no login: " + error);
      serBorderInput(true);
    }
  }

  return (
    <main className="login">
      <div className="img-container">
        <img src={keenerIMG} alt="Logo da keener.io innovations" />
      </div>
      <form className="login-form" action="/login" method="post" onSubmit={handlePostLogin}>
        <div className="form-container">
          <label className="form-label" htmlFor="user">
            User
          </label>
          <input
            style={boderInput ? border : { border: "none" }}
            className="form-input"
            type="text"
            name="user"
            id="user"
            value={user}
            onChange={(e) => setUser((e.target.value))}
          />
        </div>
        <div className="form-container">
          <label className="form-label" htmlFor="Password">
            Password
          </label>
          <div className="password-container">
            <input
              style={boderInput ? border : { border: "none" }}
              className="form-input"
              type={typePass}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img src={srcEye} alt="icone olho" onClick={passwordEye} />
          </div>
        </div>
        <div className="form-submit">
          <input type="submit" className="form-input" value="Login" />
          <Link to="/new_user" className="cadastro-user">Cadastra-se</Link>
        </div>
      </form>
    </main>
  );
}
