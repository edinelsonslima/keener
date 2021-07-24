import { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";

import Card from "../Card";

import "./style.scss";
import { CardProvider, CardContext } from "../../context/useCards";

export default function Produtos() {
  const { cards, setCards } = useContext(CardContext);

  async function handlerGetProducts() {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/produto",
        mode: "cors",
        cache: "default",
      });
      handlerListProducts(data);
    } catch (error) {
      console.log("Get all produtos: " + error);
    }
  }

  function handlerListProducts(data) {
    const cardsAux = [];
    if (data) {
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
  }

  useEffect(() => {
    handlerGetProducts();
  },[]);

  return (
    <section className="produtos">
      {cards ? (
        Object.values(cards).map((card) => {
          return card;
        })
      ) : (
        <div className="aviso">
          <h1>Nenhum produto encontrado</h1>
          <small>Tente realizar uma buscar vazia</small>
          <small>Recarregue a página</small>
        </div>
      )}
    </section>
  );
}
