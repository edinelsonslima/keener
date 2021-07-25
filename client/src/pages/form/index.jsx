import { useState } from "react";
import "./style.scss";

import { handlerAddProduct } from "../../services/api";

export default function Form(props) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  async function handlerAdd(e) {
    e.preventDefault();
    const bool = await handlerAddProduct(nome, descricao, preco);

    if (bool) {
      setNome("");
      setDescricao("");
      setPreco("");
    }
  }

  return (
    <div className="overlay" style={props.style}>
      <h1 className="title-adicionar">Adicionar novo produto</h1>
      <form
        action="/produto"
        method="post"
        className="form-adicionar"
        onSubmit={handlerAdd}
      >
        <input
          required
          className="input-form"
          type="text"
          id="name"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          required
          className="input-form"
          type="text"
          id="descricao"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          required
          className="input-form"
          type="text"
          id="preco"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <input className="adicionar" type="submit" value="Adicionar" />
      </form>
    </div>
  );
}

// function handlerAddProduct(e) {
//   e.preventDefault();
//   try {
//     axios({
//       method: "post",
//       url: "/produto",
//       data: {
//         nome: nome,
//         descricao: descricao,
//         preco: preco,
//       },
//     });
//     setNome("");
//     setDescricao("");
//     setPreco("");
//   } catch (error) {
//     console.log("Adicionar: " + error);
//   }
// }
