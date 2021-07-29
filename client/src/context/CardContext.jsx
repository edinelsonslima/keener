import { useState, createContext, useMemo } from "react";

const CardContext = createContext();

const CardProvider = (props) => {
  const [cards, setCards] = useState();

  const value = useMemo(() => ({ cards, setCards }), [cards]);
  return (
    <CardContext.Provider value={value}>
      {props.children}
    </CardContext.Provider>
  );
};
export { CardContext, CardProvider };
