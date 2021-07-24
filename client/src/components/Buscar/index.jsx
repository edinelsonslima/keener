import { useContext, useState } from "react";
import { CardContext } from "../../context/useCards";
import axios from "axios";

import Button from "../Button";
import Card from "../Card"

import "./style.scss";

export default function Buscar() {
  const border = { borderRadius: " 0 7px 7px 0" };
  const [value, setValue] = useState("");
  const { cards, setCards } = useContext(CardContext);
  async function handlerSearch() {
    try {
      const { data} = await axios({
        method: "GET",
        url: `/produto/${value}`,
        mode: "cors",
        cache: "default",
      });
      handlerShow(data);
    } catch (error) {
      setCards('')
      console.log("buscar " + error);
    }
  }
  
  function handlerShow(data) {
    const arrayAux = [];
    Object.values(data).map((produto, index) => {
      arrayAux.push(
        <Card
        key={index}
        nome={produto.nome}
        descricao={produto.descricao}
        preco={produto.preco}
      />,
      );
    });
    setCards(arrayAux)
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
      <Button nome="Buscar" style={border} function={handlerSearch} />
    </div>
  );
}
