import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { CardContext } from "../../context/CardContext";
import { AuthContext } from "../../context/AuthContext";
import { handlerGet, handlerSearchUser } from "../../services/api";
import { handlerListProducts } from "../../services/showCards";

import Button from "../../components/Button";
import Buscar from "../../components/Buscar";
import Main from "../../components/Main";
import Popup from "../../components/PopUp";

import LogoIMG from "../../assets/logo.png";

import "./style.scss";

export default function Home() {
  const history = useHistory();
  const { setCards } = useContext(CardContext);
  const { handlerLogout, user } = useContext(AuthContext);

  const [state, setState] = useState(false);
  const [historico, setHistorico] = useState(false);
  const [userName, setUserName] = useState("");

  async function handlerGetProducts() {
    const data = await handlerGet();
    if (data) {
      const listCards = await handlerListProducts(data);
      setCards(listCards);
    }
  }

  function logout() {
    const res = handlerLogout();
    if (res) {
      history.push("/login");
    }
  }

  useEffect(() => {
    (async () =>{
      const response = await handlerSearchUser(user)
      setUserName(response[0].user)
    })()
  },[user])


  return (
    <>
      <main className="home">
        <nav className="navbar-home">
          <img className="logo-nav" src={LogoIMG} alt="Logo Kenner" />
          <div className="ul-nav">
            <span className="user-name">{userName}</span>
            <Link to="/profile">Perfil</Link>
            <Button
              nome="Logout"
              function={logout}
              style={{ background: "#883636" }}
            />
          </div>
        </nav>
        <header className="header-home">
          <div className="wrapper-header">
            {historico ? null : (
              <>
                <Button
                  nome="Adicionar"
                  function={() => (state ? setState(false) : setState(true))}
                >
                  <Popup open={state} />
                </Button>
                <Button nome="Atualizar" function={handlerGetProducts} />
              </>
            )}
            <Button
              nome={historico ? "Produtos" : "Historico"}
              function={() =>
                historico ? setHistorico(false) : setHistorico(true)
              }
            />
          </div>
          <Buscar />
        </header>
        <Main historico={historico} />
      </main>
    </>
  );
}
