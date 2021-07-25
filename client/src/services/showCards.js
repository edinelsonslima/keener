import Card from "../components/Card";

export const handlerListProducts = (data) => {
  const cardsAux = [];
  Object.values(data).map((produto,index) => {
    return cardsAux.push([
      <Card
        key={index}
        chave={produto.id}
        nome={produto.nome}
        descricao={produto.descricao}
        preco={produto.preco}
      />,
    ]);
  });
  return cardsAux;
};
