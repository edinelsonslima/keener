import { useEffect, useContext } from "react";
import { handlerGetProducts } from "../../services/api";
import { handlerListProducts } from "../../services/showCards";

import "./style.scss";
import { CardContext } from "../../context/useCards";

export default function Produtos() {
  const { cards, setCards } = useContext(CardContext);

  async function handlerGet() {
    const data = await handlerGetProducts();
    if (data) {
      const listCards = await handlerListProducts(data);
      setCards(listCards);
    }
  }

  useEffect(() => {
    handlerGet();
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
