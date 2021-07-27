import { useContext, useEffect, useState } from "react";
import { CardContext } from "../../context/useCards";
import { handlerSearch } from "../../services/api.js";
import { handlerListProducts } from "../../services/showCards";

import Button from "../Button";

import "./style.scss";

export default function Buscar() {
  const border = { borderRadius: " 0 7px 7px 0" };
  const [value, setValue] = useState("");
  const { setCards } = useContext(CardContext);

  async function searchProduct() {
    const data = await handlerSearch(value);
    if (data) {
      const listCards = await handlerListProducts(data);
      setCards(listCards);
    } else setCards("");
  }


  //Busca dinâmica
  // useEffect(() => {
  //   var campoFiltro = document.getElementById("buscar");

  //   campoFiltro.addEventListener("input", function () {
  //     var cards = document.querySelectorAll(".flip");

  //     if (this.value.length > 0) {
  //       for (var i = 0; i < cards.length; i++) {
  //         var card = cards[i];
  //         var nomeCard = card.querySelector(".nome-card");
  //         var nome = nomeCard.textContent;
  //         var expressao = new RegExp(this.value, "i");

  //         if (!expressao.test(nome)) {
  //           card.style.display = "none";
  //         } else {
  //           card.style.display = "flex";
  //         }
  //       }
  //     } else {
  //       for (var i = 0; i < cards.length; i++) {
  //         var card = cards[i];
  //         card.style.display = "flex";
  //       }
  //     }
  //   });
  // });

  return (
    <div className="buscar">
      <input
        type="text"
        name="buscar"
        id="buscar"
        placeholder="Nome, descrição, preço ou id"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button nome="Buscar" style={border} function={searchProduct} />
    </div>
  );
}
