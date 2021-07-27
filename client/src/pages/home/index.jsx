import { useContext, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/useAuth";
import { CardContext } from "../../context/useCards";
import { handlerGet } from "../../services/api";
import { handlerListProducts } from "../../services/showCards";

import Button from "../../components/Button";
import Buscar from "../../components/Buscar";
import Produtos from "../../components/Produtos";
import Popup from "../../components/PopUp";

import LogoIMG from "../../assets/logo.png";

import "./style.scss";

export default function Home() {
  const { data, setData } = useContext(AuthContext);
  const { setCards } = useContext(CardContext);

  const [state, setState] = useState(false);

  const history = useHistory();

  async function handlerGetProducts() {
    const data = await handlerGet();
    if (data) {
      const listCards = await handlerListProducts(data);
      setCards(listCards);
    }
  }

  function handlerLogout() {
    const dataDefault = {
      auth: false,
      token: "",
      user: "",
    };
    setData(dataDefault);
    history.push("/login");
  }

  return data.auth ? (
    <>
      <main className="home">
        <nav className="navbar-home">
          <img className="logo-nav" src={LogoIMG} alt="Logo Kenner" />
          <div className="ul-nav">
            <Link to="/profile">Perfil</Link>
            <Button
              nome="Logout"
              function={handlerLogout}
              style={{ background: "#883636" }}
            />
          </div>
        </nav>
        <header className="header-home">
          <Button
            nome="Adicionar"
            function={() => (state ? setState(false) : setState(true))}
          >
            <Popup open={state} />
          </Button>
          <Button nome="Atualizar" function={handlerGetProducts} />
          <Buscar />
        </header>
        <Produtos />
      </main>
    </>
  ) : (
    <Redirect to="/login" />
  );
}
