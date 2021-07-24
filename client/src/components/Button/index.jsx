import { useState } from "react";

import Form from "../../pages/form";

import "./styles.scss";

export default function Button(props) {
  const [state, setState] = useState(false);
  function handlerClick() {
    state ? setState(false) : setState(true);
    console.log(state);
  }

  return props.adicionar ? (
    <>
      <button style={props.style} className="button" onClick={handlerClick}>
        {props.nome}
      </button>
      {state ? (
        <Form style={{ left: 0 }} />
      ) : (
        <Form style={{ left: "-1000px" }} />
      )}
    </>
  ) : (
    <button style={props.style} className="button" onClick={props.function}>
      {props.nome}
    </button>
  );
}
