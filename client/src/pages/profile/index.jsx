import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { handlerSearchUser } from "../../services/api";

import User from "../user";

import "./style.scss";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([""]);

  useEffect(() => {
    async function searchUser() {
      const response = await handlerSearchUser(user);
      if (response.length >= 0) {
        setData(response);
      }
    }
    searchUser();
  }, []);

  return (
    <User
      title={`Olá ${data[0].user}`}
      id={data[0].id}
      enviar="Atualizar"
      back="/"
      update
      delete
    />
  );
}
