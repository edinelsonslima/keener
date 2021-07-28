import { useEffect, useState } from "react";
import {
  handlerGetRegister,
  handlerGetDeleted,
  handlerGetEdited,
} from "../../services/api";
import "./style.scss";

export default function Registro(props) {
  const [tbody, setTbody] = useState([]);

  async function handlerShowRegister() {
    const datas = await handlerGetRegister();

    const arrayAux = [];
    datas.map((data, index) => {
      arrayAux.push(
        <tr key={index} className="tr-table">
          <td className="td-id_pd" >{data.id_pd}</td>
          <td className="td-nome" >{data.nome}</td>
          <td className="td-descricao" >{data.descricao}</td>
          <td className="td-preco" >{data.preco}</td>
          <td className="td-createdAt" >{data.createdAt}</td>
          <td className="td-updateAt" >{data.updatedAt}</td>
        </tr>
      );
    });
    setTbody(arrayAux);
  }

  async function handlerShowEdited() {
    const datas = await handlerGetEdited();

    const arrayAux = [];
    datas.map((data, index) => {
      arrayAux.push(
        <tr key={index} className="tr-table">
          <td className="td-id_pd" >{data.id_pd}</td>
          <td className="td-nome" >{data.nome}</td>
          <td className="td-descricao" >{data.descricao}</td>
          <td className="td-preco" >{data.preco}</td>
          <td className="td-createdAt" >{data.createdAt}</td>
          <td className="td-updateAt" >{data.updatedAt}</td>
        </tr>
      );
    });
    setTbody(arrayAux);
  }

  async function handlerShowDeleted() {
    const datas = await handlerGetDeleted();

    const arrayAux = [];
    datas.map((data, index) => {
      arrayAux.push(
        <tr key={index} className="tr-table">
          <td className="td-id_pd" >{data.id_pd}</td>
          <td className="td-nome" >{data.nome}</td>
          <td className="td-descricao" >{data.descricao}</td>
          <td className="td-preco" >{data.preco}</td>
          <td className="td-createdAt" >{data.createdAt}</td>
          <td className="td-updateAt" >{data.updatedAt}</td>
        </tr>
      );
    });
    setTbody(arrayAux);
  }

  useEffect(() => {
    if (props.register) return handlerShowRegister();
    if (props.edited) return handlerShowEdited();
    if (props.deleted) return handlerShowDeleted();
  }, []);

  return (
    <details>
      <summary className="title-registro">{props.title}</summary>
      <table>
        <thead>
          <tr >
            <th>id</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Criado</th>
            <th>Alterado</th>
          </tr>
        </thead>

        <tbody className="table-infos">{tbody}</tbody>
      </table>
    </details>
  );
}
