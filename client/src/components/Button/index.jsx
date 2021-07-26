import "./styles.scss";

export default function Button(props) {
  return (
    <button style={props.style} className={props.identify + " button"} onClick={props.function} value={props.value} >
      {props.nome}
      {props.children}
    </button>
  );
}
