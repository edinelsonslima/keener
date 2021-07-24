import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../auth/auth";
import axios from "axios";

import Card from "../../components/Card";
import Adicionar from "../../components/Adicionar"

import LogoIMG from "../../assets/logo.png";

import "./style.scss";

export default function Home() {
  const { data } = useContext(AuthContext);
  const [isAuth] = useState(data.auth);

  const [cards, setCards] = useState([]);

  async function handlerGetProducts() {
    const { data } = await axios({
      method: "GET",
      url: "/produto",
      mode: "cors",
      cache: "default",
    });

    if (data) handlerListProducts(data);
  }

  function handlerListProducts(data) {
    const cardsAux = [];
    Object.values(data).map((produto, index) => {
      return cardsAux.push([
        <Card
          key={index}
          nome={produto.nome}
          descricao={produto.descricao}
          preco={produto.preco}
        />,
      ]);
    });

    setCards(cardsAux);
  }

  useEffect(() => {
    handlerGetProducts();
  }, []);

  return isAuth ? (
    <main className="home">
      <nav className="navbar-home">
        <img className="logo-nav" src={LogoIMG} alt="Logo Kenner" />
        <a href="#">Logout</a>
      </nav>
      <header className="header-home">
        <Adicionar className = "button">Novo Produto</Adicionar>
        <button className="button" onClick={handlerGetProducts}>Atualizar lista</button>
        <input placeholder="Buscar" type="text" name="" id="" />
      </header>
      <section className="produtos">
        {cards.map((card) => {
          return card;
        })}
      </section>
    </main>
  ) : (
    <Redirect to="/login" />
  );
}
