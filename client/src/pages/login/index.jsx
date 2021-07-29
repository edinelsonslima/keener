import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";

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
  const { handlePostLogin } = useContext(AuthContext);

  async function handlerLogin(e) {
    e.preventDefault();
    const res = await handlePostLogin(user, password);
    if (res) {
      history.push("/");
    } else {
      serBorderInput(false);
      serBorderInput(true);
    }
  }

  return (
    <main className="login">
      <div className="img-container">
        <img src={keenerIMG} alt="Logo da keener.io innovations" />
      </div>
      <form
        className="login-form"
        action="/login"
        method="post"
        onSubmit={handlerLogin}
      >
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
            onChange={(e) => setUser(e.target.value)}
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
          <Link to="/new_user" className="cadastro-user">
            Cadastra-se
          </Link>
        </div>
      </form>
    </main>
  );
}
