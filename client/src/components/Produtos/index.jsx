import { useEffect, useContext } from "react";
import { handlerGet } from "../../services/api";
import { handlerListProducts } from "../../services/showCards";

import "./style.scss";
import { CardContext } from "../../context/useCards";

export default function Produtos() {
  const { cards, setCards } = useContext(CardContext);

  useEffect(() => {
    async function handlerGetProducts() {
      const data = await handlerGet();
      if (data) {
        const listCards = await handlerListProducts(data);
        setCards(listCards);
      }
    }
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
