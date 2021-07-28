import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { handlerSearchUser } from "../../services/api";

import User from "../user";

import "./style.scss";

export default function Profile() {
  const [user, setUser] = useState([""]);

  useEffect(() => {
    async function searchUser() {
      const response = await handlerSearchUser(sessionStorage.getItem("user_id"));
      if (response.length >= 0) {
        setUser(response);
      }
    }
    searchUser();
  }, []);

  return sessionStorage.getItem("auth") ? (
    <User
      title={`Olá ${user[0].user}`}
      id={user[0].id}
      enviar="Atualizar"
      back="/"
      update
      delete
    />
  ) : (
    <Redirect to="/login" />
  );
}
