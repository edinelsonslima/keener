import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/useAuth";
import { handlerSearchUser } from "../../services/api";

import User from "../user";

import "./style.scss";

export default function Profile() {
  const { data } = useContext(AuthContext);
  const [user, setUser] = useState([""]);

  useEffect(() => {
    async function searchUser() {
      const response = await handlerSearchUser(data.user);
      if (response.length >= 0) {
        setUser(response);
      }
    }
    searchUser();
  }, []);

  return data.auth ? (
    <User
      title={`Olá ${user[0].user}`}
      id={user[0].id}
      enviar="Atualizar"
      back="/"
      update
    />
  ) : (
    <Redirect to="/login" />
  );
}
