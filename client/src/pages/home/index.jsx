import { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/useAuth";
import { CardContext } from "../../context/useCards";
import { handlerGetProducts } from "../../services/api";
import { handlerListProducts } from "../../services/showCards";

import Button from "../../components/Button";
import Buscar from "../../components/Buscar";
import Produtos from "../../components/Produtos";

import LogoIMG from "../../assets/logo.png";

import "./style.scss";

export default function Home() {
  const { data ,setData } = useContext(AuthContext);
  const { setCards } = useContext(CardContext);
  const [isAuth] = useState(data.auth);
  const history =useHistory();

  async function handlerGet() {
    const data = await handlerGetProducts();
    if (data) {
      const listCards = await handlerListProducts(data);
      setCards(listCards);
    }
  }

  function handlerLogout(){
    const dataDefault = {
      auth: false,
      token: ''
    }
    setData(dataDefault)
    history.push("/login")
  }

  return isAuth ? (
    <main className="home">
      <nav className="navbar-home">
        <img className="logo-nav" src={LogoIMG} alt="Logo Kenner" />
        <Button nome="Logout" function={handlerLogout}/>
      </nav>
      <header className="header-home">
        <Button nome="Adicionar" adicionar />
        <Button nome="Atualizar" function={handlerGet} />
        <Buscar />
      </header>
      <Produtos />
    </main>
  ) : (
    <Redirect to="/login" />
  );
}
