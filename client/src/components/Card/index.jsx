import { handlerListProducts } from "../../services/showCards";
import { CardContext } from "../../context/useCards";
import { useContext, useEffect, useState } from "react";
import { handlerDelete, handlerGet } from "../../services/api";

import Button from "../Button";
import Popup from "../PopUp";

import artIMG from "../../assets/seta.png";

import "./style.scss";

export default function Card(props) {
  const [state, setState] = useState(false);
  const [id, setId] = useState("");
  const { setCards } = useContext(CardContext);

  async function handlerDeleteCard() {
    const allCards = document.getElementsByClassName("deletar");
    Object.values(allCards).forEach(function (card) {
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
        card.addEventListener("click", () => {
          card.style.background = "red";
        });
        card.addEventListener("mouseout", () => {
          card.style.background = "#367588";
        });
      }
    });
  }

  function handlerEditCard() {
    const allCards = document.getElementsByClassName("editar");
    Object.values(allCards).forEach(function (card) {
      if (card) {
        card.addEventListener("click", async () => {
          const chave = card.value;
          console.log(chave);
          return setId(chave);
        });
      }
    });
    return true;
  }
  async function handlerShowModalEdit() {
    const bool = await handlerEditCard();
    if (bool) {
      state ? setState(false) : setState(true);
    }
  }
  useEffect(() => {
    handlerEditCard();
    handlerDeleteCard();
  }, []);

  function handlerInvertCard(id) {
    const cards = document.querySelectorAll(".back");
    for (let card of cards) {
      const idCard = card.querySelector("input[type='hidden']").value;
      if (id === Number(idCard)) {
        const bool = card.classList.contains("invert-back");
        bool
          ? card.classList.remove("invert-back")
          : card.classList.add("invert-back");
      }
    }
  }

  return (
    <>
      <div className="flip">
        <div className="front">
          <h1 className="nome-card">{props.nome}</h1>
          <p className="descricao-card">{props.descricao}</p>
          <p className="preco-card">{props.preco}</p>
        </div>
        <div
          className="button-invert"
          onClick={() => handlerInvertCard(props.chave)}
        >
          <img src={artIMG} alt="icone seta"/>
        </div>
        <div className="back">
          <Button
            nome="Editar"
            identify="editar"
            function={handlerShowModalEdit}
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
          <input type="hidden" value={props.chave} />
        </div>
      </div>
    </>
  );
}
