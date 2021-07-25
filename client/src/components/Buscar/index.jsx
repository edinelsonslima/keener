import { useContext, useState } from "react";
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
