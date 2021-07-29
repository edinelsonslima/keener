import { useEffect, useContext } from "react";
import { handlerGet } from "../../services/api";
import { handlerListProducts } from "../../services/showCards";
import { CardContext } from "../../context/CardContext";

import Registro from "../Registro";

import "./style.scss";

export default function Main(props) {
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
  }, []);

  return props.historico ? (
    <section className="historico">
      <Registro register title="Todos Adicionados" />
      <Registro edited title="Todos Editados" />
      <Registro deleted title="Todos Deletados" />
    </section>
  ) : (
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
