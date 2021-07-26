import { useState, useContext, useEffect } from "react";
import { CardContext } from "../../context/useCards";
import {
  handlerAdd,
  handlerGet,
  handlerSearch,
  handlerUpdate,
} from "../../services/api";
import { handlerListProducts } from "../../services/showCards";

import "./style.scss";

export default function Form(props) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  const { setCards } = useContext(CardContext);

  async function handlerAddCard(e) {
    e.preventDefault();
    const bool = handlerAdd(nome, descricao, preco);
    if (bool) {
      const data = await handlerGet();
      const listCards = handlerListProducts(data);
      setCards(listCards);
      setNome("");
      setDescricao("");
      setPreco("");
    }
    return;
  }

  async function handlerUpdateCard(e) {
    e.preventDefault();
    const newCard = handlerUpdate(props.id, nome, descricao, preco);
    if (!newCard) return;
    const data = await handlerGet();
    const listCards = handlerListProducts(data);
    setCards(listCards);
    setNome("");
    setDescricao("");
    setPreco("");
    return;
  }

  useEffect(() => {
    async function handlerInputsValue() {
      if (props.id) {
        const data = await handlerSearch(props.id);
        setNome(data[0].nome);
        setDescricao(data[0].descricao);
        setPreco(data[0].preco);
      }
    }
    handlerInputsValue();
  }, [props.id]);


  return (
    <div className="overlay" style={props.open}>
      <h1 className="title-adicionar">Adicionar novo produto</h1>
      <form
        action="/produto"
        method="post"
        className="form-adicionar"
        onSubmit={props.update ? handlerUpdateCard : handlerAddCard}
      >
        <input
          required
          className="input-form"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          required
          className="input-form"
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          required
          className="input-form"
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <div className="buttons">
          <input className="adicionar" type="submit" value="Adicionar" />
          <button className="adicionar" onClick = {props.close}>Fechar</button>
        </div>
      </form>
    </div>
  );
}
