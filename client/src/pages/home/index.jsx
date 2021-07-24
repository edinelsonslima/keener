import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/useAuth";
import { CardProvider } from "../../context/useCards";

import Button from "../../components/Button";
import Buscar from "../../components/Buscar";
import Produtos from "../../components/Produtos";

import LogoIMG from "../../assets/logo.png";

import "./style.scss";

export default function Home() {
  const { data } = useContext(AuthContext);
  const [isAuth] = useState(data.auth);

  return isAuth ? (
    <main className="home">
      <nav className="navbar-home">
        <img className="logo-nav" src={LogoIMG} alt="Logo Kenner" />
        <a href="#">Logout</a>
      </nav>
      <CardProvider>
        <header className="header-home">
          <Button nome="Adicionar" adicionar />
          <Button nome="Atualizar" />
          <Buscar />
        </header>
        <Produtos />
      </CardProvider>
    </main>
  ) : (
    <Redirect to="/login" />
  );
}
