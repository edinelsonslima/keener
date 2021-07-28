import { Link, useHistory } from "react-router-dom";
import {
  handlerAddUser,
  handlerUpdateUser,
  handlerSearchUser,
  handlerDeleteUser,
} from "../../services/api";
import logoIMG from "../../assets/logo.png";

import "./style.scss";
import { useEffect, useState } from "react";

export default function NewUser(props) {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clickDelete, setClickDelete] = useState(false);
  const history = useHistory();

  async function handlerNewUser(e) {
    e.preventDefault();
    const info = document.querySelector(".info");
    try {
      const newUser = await handlerAddUser(user, email, password);
      if (newUser) {
        setUser("");
        setEmail("");
        setPassword("");

        info.innerText = "sucesso!!!";
        info.style.color = "#00ff6a";
      } else {
        info.innerText = "falhou!!!";
        info.style.color = "#ff0000";
      }
    } catch (error) {
      console.log("User: " + error);
    }
  }

  async function handlerUpdate(e) {
    e.preventDefault();
    const info = document.querySelector(".info");
    const userUp = await handlerUpdateUser(props.id, user, email, password);

    if (userUp) {
      setUser("");
      setEmail("");
      setPassword("");
      info.innerText = "Atualizado com sucesso!!!";
      info.style.color = "#00ff6a";
    } else {
      info.innerText = "falhou!!!";
      info.style.color = "#ff0000";
    }
  }

  async function handlerDelete(e) {
    e.preventDefault();
    const info = document.querySelector(".info");
    if (!clickDelete) {
      info.innerText = "Para confirmar, click outra vez!";
      info.style.fontSize = "25px";
      info.style.color = "#ff0000";
      setClickDelete(true);
      return;
    }
    if (clickDelete) {
      const bool = await handlerDeleteUser(props.id);

      if (bool) {
        setUser("");
        setEmail("");
        setPassword("");
        setClickDelete(false);
        sessionStorage.clear();
        history.push("/login");
        return;
      }
      return;
    }
  }

  useEffect(() => {
    async function handlerInputsValue() {
      if (props.id) {
        const response = await handlerSearchUser(props.id);
        if (response) {
          setUser(response[0].user);
          setEmail(response[0].email);
        }
      }
    }
    handlerInputsValue();
  }, [props.id]);

  return (
    <main className="new-user">
      <img src={logoIMG} alt="logo da keener" />
      <div className="container-user">
        <div className="titles">
          <h1 className="title-user">{props.title}</h1>
          <h2 className="info"></h2>
        </div>
        <form
          className="form-user"
          onSubmit={props.update ? handlerUpdate : handlerNewUser}
        >
          <label htmlFor="user">Usuário</label>
          <input
            type="text"
            id="user"
            placeholder="usuário"
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            type="text"
            id="password"
            placeholder="senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="container-buttons">
            <div className="buttons-default">
              <input type="submit" value={props.enviar} />
              <Link className="back-user" to={props.back}>
                Voltar
              </Link>
            </div>

            {props.delete ? (
              <button className="delete-user" onClick={handlerDelete}>
                Deletar
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </main>
  );
}
