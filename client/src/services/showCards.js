import Card from "../components/Card";

export const handlerListProducts = (data) => {
  const cardsAux = [];
  Object.values(data).map((produto, index) => {
    const valor = produto.preco.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    return cardsAux.push([
      <Card
        key={index}
        chave={produto.id}
        nome={produto.nome}
        descricao={produto.descricao}
        preco={valor}
      />,
    ]);
  });
  return cardsAux;
};
