import Button from "../Button";

import "./style.scss";

export default function Card(props) {
  function handleGetIdCard() {
    const allCards = document.querySelectorAll(".flip");
    allCards.forEach(function (card) {
      card.onclick = () => {
        const chave = card.querySelector("input").value;
        console.log(chave);
      };
    });
  }

  return (
    <div className="flip">
      <div className="front">
        <h1 className="nome-card">{props.nome}</h1>
        <p className="descricao-card">{props.descricao}</p>
        <p className="preco-card">R${props.preco}</p>
        <input type="hidden" value={props.chave} />
      </div>
      <div className="back">
        <Button nome="Editar" function={handleGetIdCard} />
        <Button nome="Apagar" function={handleGetIdCard} />
      </div>
    </div>
  );
}
