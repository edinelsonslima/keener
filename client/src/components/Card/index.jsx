

import "./style.scss";

export default function Card(props) {
  return (
    <div className="card">
      <h1 className="nome-card">{props.nome}</h1>
      <p className="descricao-card">{props.descricao}</p>
      <p className="preco-card">R${props.preco}</p>
    </div>
  );
}
