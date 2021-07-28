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

  // Busca dinâmica
  useEffect(() => {
    let campoFiltro = document.getElementById("buscar");

    campoFiltro.addEventListener("input", function () {
      let rows = document.querySelectorAll(".tr-table");

      if (this.value.length > 0) {
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          let id_pd = row.querySelector(".td-id_pd");
          let td_nome = row.querySelector(".td-nome");
          let td_descricao = row.querySelector(".td-descricao");
          let td_preco = row.querySelector(".td-preco");
          // let td_createdAt = row.querySelector(".td-createdAt");
          // let td_updateAt = row.querySelector(".td-updateAt");

          let id = id_pd.textContent;
          let nome = td_nome.textContent;
          let descricao = td_descricao.textContent;
          let preco = td_preco.textContent;
          // let createdAt = td_createdAt.textContent;
          // let updateAt = td_updateAt.textContent;

          let expressao = new RegExp(this.value, "i");

          if (
            !expressao.test(id) &&
            !expressao.test(nome) &&
            !expressao.test(descricao) &&
            !expressao.test(preco)
            // !expressao.test(createdAt) &&
            // !expressao.test(updateAt)
          ) {
            row.style.display = "none";
          } else {
            row.style.display = "";
          }
        }
      } else {
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          row.style.display = "";
        }
      }
    });
  }, []);

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
