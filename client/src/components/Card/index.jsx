import { handlerListProducts } from "../../services/showCards";
import { CardContext } from "../../context/useCards";
import { useContext, useEffect, useState } from "react";
import { handlerDelete, handlerGet } from "../../services/api";

import Button from "../Button";
import Popup from "../PopUp";

import "./style.scss";

export default function Card(props) {
  const [state, setState] = useState(false);
  const [id, setId] = useState("");
  const { setCards } = useContext(CardContext);

  async function handlerDeleteCard() {
    const allCards = document.querySelectorAll("button");
    allCards.forEach(function (card) {
      if (card) {
        card.addEventListener("dblclick", async () => {
          try {
            const chave = card.value;
            const cardDeleted = await handlerDelete(chave);
            if (cardDeleted) {
              const data = await handlerGet();
              const listCards = handlerListProducts(data);
              setCards(listCards);
            }
          } catch (error) {
            console.log(error);
          }
        });
      }
    });
  }

  function handlerEditCard() {
    const allCards = document.getElementsByClassName("editar");
    // allCards.forEach(function (card) {
    //   if (card) {
    //     card.addEventListener("click", async () => {
    //       const chave = card.value;
    //       setId(chave);
    //     });
    //   }
    // });
    state ? setState(true) : setState(false);
  }

  useEffect(() => {
    handlerEditCard();
    handlerDeleteCard();
  }, []);

  return (
    <>
      <div className="flip">
        <div className="front">
          <h1 className="nome-card">{props.nome}</h1>
          <p className="descricao-card">{props.descricao}</p>
          <p className="preco-card">{props.preco}</p>
          <input type="hidden" value={props.chave} />
        </div>
        <div className="back">
          <Button
            nome="Editar"
            identify="editar"
            function={handlerEditCard}
            value={props.chave}
          >
            <Popup open={state} id={id} update />
          </Button>
          <Button
            nome="Apagar"
            identify="deletar"
            function={handlerDeleteCard}
            value={props.chave}
          />
          <small className="span">Duplo click para apagar!</small>
        </div>
      </div>
    </>
  );
}
